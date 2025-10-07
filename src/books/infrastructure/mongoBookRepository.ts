import { BookModel } from "./model/books.model";
import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";
import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import mongoose from "mongoose";
import { serviceContainer } from "../../shared/services/serviceContainer";
import { EmbeddingModel } from "../../ai/infrastructure/model/embeddingModel";
import { extractTextByPage } from "../../shared/utils/pdfService";
import { PipelineStage } from "mongoose";

export class MongoBookRepository implements BooksRepository {
  //  ✅
  async createBook(book: Books): Promise<void> {
    const newBook = new BookModel(book);
    const result = await newBook.save();
    const id: Types.ObjectId = result._id as Types.ObjectId;
    if (result.genre === "Narrativo") {
      const url = result.contentBook.url_secura;
      const text = await extractTextByPage(url);
      const title = result.title;
      await serviceContainer.bookContent.createBookContent.run(id, title, text);
    }

    await serviceContainer.ai.createEmbedding.run(id, result.title, result.summary, result.synopsis);
  }

  //  ✅
  async getAllBooks(): Promise<SearchedBook[]> {
    const books = await BookModel.find().populate("author", "fullName");
    return books;
  }

  //  ✅
  async updateBookById(id: Types.ObjectId, book: SearchedBook): Promise<void> {
    await BookModel.findByIdAndUpdate(id, book);
  }

  //  ✅
  async deleteBook(id: Types.ObjectId): Promise<void> {
    await BookModel.findByIdAndDelete(id);

    await EmbeddingModel.deleteMany({ bookId: id });
  }

  //  ✅
  async getBookById(id: Types.ObjectId): Promise<SearchedBook | null> {
    const book: SearchedBook | null = await BookModel.findById(id).populate("author", "fullName");

    if (!book) return null;

    return book;
  }

  //  ✅
  async getIntelligenceBook(query: string[], level?: string): Promise<SearchedBook[]> {
    const regexTerms = query.map((term) => new RegExp(term, "i"));

    const orderedBooks = await BookModel.aggregate([
      {
        $lookup: {
          from: "authormodels",
          localField: "author",
          foreignField: "_id",
          as: "authorData",
        },
      },
      {
        $addFields: {
          matchScore: {
            $sum: regexTerms.map((regex) => ({
              $add: [
                { $cond: [{ $regexMatch: { input: "$title", regex } }, 3, 0] },
                { $cond: [{ $regexMatch: { input: "$summary", regex } }, 1, 0] },
                { $cond: [{ $regexMatch: { input: "$synopsis", regex } }, 1, 0] },
                { $cond: [{ $regexMatch: { input: "$genre", regex } }, 1, 0] },
                { $cond: [{ $regexMatch: { input: "$yearBook", regex } }, 1, 0] },
                {
                  $cond: [
                    {
                      $gt: [
                        {
                          $size: {
                            $filter: {
                              input: "$subgenre",
                              as: "s",
                              cond: { $regexMatch: { input: "$$s", regex } },
                            },
                          },
                        },
                        0,
                      ],
                    },
                    1,
                    0,
                  ],
                },
                {
                  $cond: [
                    {
                      $gt: [
                        {
                          $size: {
                            $filter: {
                              input: "$theme",
                              as: "t",
                              cond: { $regexMatch: { input: "$$t", regex } },
                            },
                          },
                        },
                        0,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              ],
            })),
          },
        },
      },
      {
        $match: {
          matchScore: { $gt: 0 },
        },
      },
      {
        $sort: { matchScore: -1, createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          summary: 1,
          synopsis: 1,
          subgenre: 1,
          theme: 1,
          genre: 1,
          yearBook: 1,
          language: 1,
          available: 1,
          level: 1,
          format: 1,
          fileExtension: 1,
          totalPages: 1,
          createdAt: 1,
          updatedAt: 1,
          contentBook: 1,
          bookCoverImage: 1,
          author: {
            $map: {
              input: "$authorData",
              as: "a",
              in: {
                _id: "$$a._id",
                name: "$$a.fullName",
              },
            },
          },
        },
      },
    ]);

    return orderedBooks;
  }

  //  ✅
  async getContentBookById(id: Types.ObjectId): Promise<string | null> {
    const book: SearchedBook | null = await BookModel.findById(id);

    if (!book) return null;

    return book.contentBook.url_secura;
  }

  //  ✅
  async getAllBooksByLevel(nivel: string): Promise<SearchedBook[]> {
    if (nivel === "Inicial") {
      const books = await BookModel.find({ level: { $in: ["Inicial"] } }).populate("author", "fullName");
      return books;
    } else if (nivel === "Secundario") {
      const books = await BookModel.find({ level: { $in: ["Secundario", "Inicial"] } }).populate("author", "fullName");
      return books;
    } else if (nivel === "Joven Adulto") {
      const books = await BookModel.find({ level: { $in: ["Joven Adulto", "Secundario", "Inicial"] } }).populate("author", "fullName");
      return books;
    } else if (nivel === "Adulto Mayor") {
      const books = await BookModel.find({ level: { $in: ["Adulto Mayor", "Joven Adulto", "Secundario", "Inicial"] } }).populate("author", "fullName");
      return books;
    }

    return await BookModel.find().populate("author", "fullName");
  }

  //  ✅
  async getBooksByFiltering(theme: string[], subgenre: string[], yearBook: string[], genre: string[], format: string[], level?: string): Promise<SearchedBook[]> {
    const levelHierarchy: Record<string, string[]> = {
      inicial: ["Inicial"],
      secundario: ["Secundario", "Inicial"],
      "joven adulto": ["Joven Adulto", "Secundario", "Inicial"],
      "adulto Mayor": ["Adulto Mayor", "Joven Adulto", "Secundario", "Inicial"],
    };

    const filters: Record<string, any> = {};
    if (yearBook?.length) filters.yearBook = { $in: yearBook };
    if (theme?.length) filters.theme = { $in: theme };
    if (subgenre?.length) filters.subgenre = { $in: subgenre };
    if (genre?.length) filters.genre = { $in: genre };
    if (format?.length) filters.format = { $in: format };
    if (level && levelHierarchy[level]?.length) filters.level = { $in: levelHierarchy[level] };

    const pipeline: PipelineStage[] = [];

    if (Object.keys(filters).length > 0) {
      pipeline.push({ $match: filters });
    }

    const scoreConditions: (number | { $cond: [any, number, number] })[] = [];

    if (yearBook?.length) {
      scoreConditions.push({ $cond: [{ $in: ["$yearBook", yearBook] }, 1, 0] });
    }
    if (theme?.length) {
      scoreConditions.push({ $cond: [{ $gt: [{ $size: { $setIntersection: ["$theme", theme] } }, 0] }, 1, 0] });
    }
    if (subgenre?.length) {
      scoreConditions.push({ $cond: [{ $gt: [{ $size: { $setIntersection: ["$subgenre", subgenre] } }, 0] }, 1, 0] });
    }
    if (genre?.length) {
      scoreConditions.push({ $cond: [{ $in: ["$genre", genre] }, 1, 0] });
    }
    if (format?.length) {
      scoreConditions.push({ $cond: [{ $in: ["$format", format] }, 1, 0] });
    }
    if (level && levelHierarchy[level]?.length) {
      scoreConditions.push({ $cond: [{ $in: ["$level", levelHierarchy[level]] }, 1, 0] });
    }

    pipeline.push({
      $addFields: {
        score: {
          $add: scoreConditions.length > 0 ? scoreConditions : [0],
        },
      },
    });

    pipeline.push({ $sort: { score: -1 } });

    pipeline.push({
      $lookup: {
        from: "authormodels",
        localField: "author",
        foreignField: "_id",
        as: "authorData",
      },
    });

    pipeline.push({
      $addFields: {
        author: {
          $map: {
            input: "$authorData",
            as: "a",
            in: {
              _id: "$$a._id",
              name: "$$a.fullName",
            },
          },
        },
      },
    });

    const books = await BookModel.aggregate(pipeline).exec();
    return books as SearchedBook[];
  }

  //  ✅
  async getBooksByIds(ids: Types.ObjectId[]): Promise<SearchedBook[]> {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
    const books = await BookModel.find({ _id: { $in: objectIds } }).populate("author", "fullName");
    return books;
  }

  //  ✅
  async getAllThemes(): Promise<string[]> {
    const books = await BookModel.find({}, { theme: 1, _id: 0 });
    const themes = new Set<string>();

    books.forEach((book) => {
      book.theme.forEach((t) => themes.add(t));
    });

    return Array.from(themes);
  }

  //  ✅
  async getAllSubgenres(): Promise<string[]> {
    const books = await BookModel.find({}, { subgenre: 1, _id: 0 });
    const subgenres = new Set<string>();

    books.forEach((book) => {
      book.subgenre.forEach((s) => subgenres.add(s));
    });

    return Array.from(subgenres);
  }

  //  ✅
  async getAllGenres(): Promise<string[]> {
    const books = await BookModel.find({}, { genre: 1, _id: 0 });

    const genres = new Set<string>();

    books.forEach((book) => {
      if (book.genre) {
        genres.add(book.genre);
      }
    });

    return Array.from(genres);
  }

  //  ✅
  async getAllYears(): Promise<string[]> {
    const books = await BookModel.find({}, { yearBook: 1, _id: 0 });

    const years = new Set<string>();

    books.forEach((book) => {
      years.add(book.yearBook);
    });
    return Array.from(years);
    // opcional: orden ascendente
  }

  //  ✅
  async getAllFormats(): Promise<string[]> {
    return BookModel.distinct("format").exec();
  }

  // ✅
  async getBookByAuthorId(idsAuthor: Types.ObjectId): Promise<SearchedBook[]> {
    const books = await BookModel.find({ author: { $in: [idsAuthor] } }).populate("author", "fullName");
    return books;
  }
}

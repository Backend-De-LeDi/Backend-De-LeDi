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
import { serviceAi } from "../../ai/helper/saveForVectorStore";

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
    await serviceAi.exec(id)
  }

  //  ✅
  async getAllBooks(): Promise<SearchedBook[]> {
    const books = await BookModel.find()
      .populate("author", "fullName")
      .sort({ createdAt: -1 });

    return books;
  }

  //  ✅
  async updateBookById(id: Types.ObjectId, book: SearchedBook): Promise<void> {
    await BookModel.findByIdAndUpdate(id, book);
  }

  //  🔄️
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
  async getIntelligenceBook(query: string[], userLevel?: string): Promise<SearchedBook[]> {
    const searchText = query.join(" ");
    const matchText: any = { $text: { $search: searchText } };

    if (userLevel) {
      matchText.level = userLevel;
    }

    let orderedBooks = await BookModel.aggregate([
      { $match: matchText },
      {
        $lookup: {
          from: "authormodels",
          localField: "author",
          foreignField: "_id",
          as: "authorData"
        }
      },
      { $addFields: { matchScore: { $meta: "textScore" } } },
      { $sort: { matchScore: -1, createdAt: -1 } },
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
          matchScore: 1,
          author: {
            $map: {
              input: "$authorData",
              as: "a",
              in: {
                _id: "$$a._id",
                fullName: "$$a.fullName"
              }
            }
          }
        }
      }
    ]);

    if (orderedBooks.length === 0) {
      const regex = new RegExp(searchText.split(" ").join("|"), "i");
      const regexMatch: any = {};

      if (userLevel) {
        regexMatch.level = userLevel;
      }

      orderedBooks = await BookModel.aggregate([
        {
          $lookup: {
            from: "authormodels",
            localField: "author",
            foreignField: "_id",
            as: "authorData"
          }
        },
        {
          $match: {
            ...regexMatch,
            $or: [
              { title: regex },
              { summary: regex },
              { synopsis: regex },
              { genre: regex },
              { theme: regex },
              { subgenre: regex },
              { "authorData.fullName": regex } // 🧠 búsqueda por autor
            ]
          }
        },
        {
          $addFields: { matchScore: 0.1 }
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
                  fullName: "$$a.fullName"
                }
              }
            },
            matchScore: 1
          }
        },
        { $sort: { createdAt: -1 } }
      ]);
    }

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
    const levelHierarchy: Record<string, string[]> = {
      "Inicial": ["Inicial"],
      "Secundario": ["Secundario", "Inicial"],
      "Joven Adulto": ["Joven Adulto", "Secundario", "Inicial"],
      "Adulto Mayor": ["Adulto Mayor", "Joven Adulto", "Secundario", "Inicial"]
    };

    const allowedLevels = levelHierarchy[nivel] || ["Inicial", "Secundario", "Joven Adulto", "Adulto Mayor"];

    const books = await BookModel.find({ level: { $in: allowedLevels } })
      .populate("author", "fullName")
      .sort({ createdAt: -1 });

    return books;
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
              fullName: "$$a.fullName",
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

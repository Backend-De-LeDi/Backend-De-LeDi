import { BookModel } from "./model/books.model";
import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";
import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { FilterCondition } from "../../shared/types/filterType";
import { serviceContainer } from "../../shared/services/serviceContainer";
import mongoose from "mongoose";

export class MongoBookRepository implements BooksRepository {
  //  ✅
  async createBook(book: Books): Promise<void> {
    const newBook = new BookModel(book);

    await serviceContainer.ConnectionAI.uploadBookForIA(newBook);

    await newBook.save();
  }

  //  ✅
  async getAllBooks(): Promise<SearchedBook[]> {
    const books = await BookModel.find().populate("author", "name");
    return books;
  }

  async updateBookById(id: Types.ObjectId, book: SearchedBook): Promise<void> {
    await BookModel.findByIdAndUpdate(id, book);
    await serviceContainer.ConnectionAI.updateBookInIA(id.toString(), book);
  }

  //  ✅
  async deleteBook(id: Types.ObjectId): Promise<void> {
    await BookModel.findOneAndDelete(id);
    await serviceContainer.ConnectionAI.deleteBookFromIA(id.toString());
  }

  //  ✅
  async getBookById(id: Types.ObjectId): Promise<SearchedBook | null> {
    const book: SearchedBook | null = await BookModel.findById(id).populate("author", "name");

    if (!book) return null;

    return book;
  }

  //  ✅
  async getIntelligenceBook(query: string[]): Promise<SearchedBook[]> {
    const regexTerms = query.map((term) => new RegExp(term, "i"));

    const orderedBooks = await BookModel.aggregate([
      {
        $lookup: {
          from: "authormodels", // nombre real de la colección en MongoDB (pluralizado y en minúsculas)
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
                name: "$$a.name",
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
    if (nivel === "inicial") {
      const books = await BookModel.find({ level: { $in: ["inicial"] } }).populate("author", "name");
      return books;
    } else if (nivel === "secundario") {
      const books = await BookModel.find({ level: { $in: ["secundario", "inicial"] } }).populate("author", "name");
      return books;
    } else if (nivel === "joven adulto") {
      const books = await BookModel.find({ level: { $in: ["joven adulto", "secundario", "inicial"] } }).populate("author", "name");
      return books;
    } else if (nivel === "adulto Mayor") {
      const books = await BookModel.find({ level: { $in: ["adulto Mayor", "joven adulto", "secundario", "inicial"] } }).populate("author", "name");
      return books;
    }

    return await BookModel.find().populate("author", "name");
  }

  //  ✅
  async getBooksByFiltering(theme: string[], subgenre: string[], yearBook: string[], genre: string[], format: string[]): Promise<SearchedBook[]> {
    const conditions: FilterCondition[] = [];

    if (yearBook.length > 0) conditions.push({ yearBook: { $in: yearBook } });
    if (theme.length > 0) conditions.push({ theme: { $in: theme } });
    if (subgenre.length > 0) conditions.push({ subgenre: { $in: subgenre } });
    if (genre.length > 0) conditions.push({ genre: { $in: genre } });
    if (format.length > 0) conditions.push({ format: { $in: format } });

    if (conditions.length === 0) return await BookModel.find().exec();

    const books = await BookModel.find({ $or: conditions }).populate("author", "name").lean().exec();

    const scored = books.map((book) => {
      let score = 0;

      if (yearBook.length > 0 && yearBook.includes(book.yearBook)) score++;

      if (theme.length > 0 && book.theme.some((t: string) => theme.includes(t))) score++;

      if (subgenre.length > 0 && book.subgenre.some((s: string) => subgenre.includes(s))) score++;

      if (genre.length > 0 && genre.includes(book.genre)) score++;

      if (format.length > 0 && format.includes(book.format)) score++;

      return { ...book, score };
    });

    const sorted = scored.sort((a, b) => b.score - a.score);

    return sorted.map((book) => book as SearchedBook & { score: number });
  }

  //  ✅
  async getBooksByIds(ids: Types.ObjectId[]): Promise<SearchedBook[]> {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
    const books = await BookModel.find({ _id: { $in: objectIds } });
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
}

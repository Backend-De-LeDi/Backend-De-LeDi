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
    const books = await BookModel.find();

    return books;
  }

  //  🔄️
  async deleteBook(id: Types.ObjectId): Promise<void> {
    await BookModel.findOneAndDelete(id);
    await serviceContainer.ConnectionAI.deleteBookFromIA(id.toString());
  }

  //  ✅
  async getBookById(id: Types.ObjectId): Promise<SearchedBook | null> {
    const book: SearchedBook | null = await BookModel.findById(id);

    if (!book) return null;

    return book;
  }

  //  ✅
  async getIntelligenceBook(id: string[]): Promise<SearchedBook[]> {
    const ids = id.map((x) => new mongoose.Types.ObjectId(x));
    const orderedBooks = await BookModel.aggregate([
      { $match: { _id: { $in: ids } } },
      {
        $addFields: {
          __order: { $indexOfArray: [ids, "$_id"] },
        },
      },
      { $sort: { __order: 1 } },
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
      const books = await BookModel.find({ level: { $in: ["inicial"] } });
      return books;
    } else if (nivel === "secundario") {
      const books = await BookModel.find({ level: { $in: ["secundario", "inicial"] } });
      return books;
    } else if (nivel === "joven adulto") {
      const books = await BookModel.find({ level: { $in: ["joven adulto", "secundario", "inicial"] } });
      return books;
    } else if (nivel === "adulto Mayor") {
      const books = await BookModel.find({ level: { $in: ["adulto Mayor", "joven adulto", "secundario", "inicial"] } });
      return books;
    }

    return await BookModel.find();
  }

  //  ✅
  async getBooksByFiltering(theme: string[], subgenre: string[], yearBook: Date[], genre: string[]): Promise<SearchedBook[]> {
    const conditions: FilterCondition[] = [];

    if (yearBook.length > 0) conditions.push({ yearBook: { $in: yearBook } });
    if (theme.length > 0) conditions.push({ theme: { $in: theme } });
    if (subgenre.length > 0) conditions.push({ subgenre: { $in: subgenre } });
    if (genre.length > 0) conditions.push({ genre: { $in: genre } });

    if (conditions.length === 0) return await BookModel.find().exec();

    const books = await BookModel.find({ $or: conditions }).lean().exec();

    const scored = books.map((book) => {
      let score = 0;

      if (yearBook.length > 0 && yearBook.some((date) => new Date(date).getFullYear() === new Date(book.yearBook).getFullYear())) score++;

      if (theme.length > 0 && book.theme.some((t: string) => theme.includes(t))) score++;

      if (subgenre.length > 0 && book.subgenre.some((s: string) => subgenre.includes(s))) score++;

      if (genre.length > 0 && genre.includes(book.genre)) score++;

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
}

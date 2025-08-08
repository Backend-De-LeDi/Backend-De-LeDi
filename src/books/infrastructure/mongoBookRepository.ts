import { BookModel } from "./model/books.model";
import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";
import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { FilterCondition } from "../../shared/types/filterType";
import { serviceContainer } from "../../shared/services/serviceContainer";
import mongoose from "mongoose";

// ? repositorio de mongo que implementa los métodos del repositorio guía: BooksRepository
export class MongoBookRepository implements BooksRepository {
  // ? método de repositorio que es para crear o almacenar un nuevo libro ✅
  async createBook(book: Books): Promise<void> {
    const newBook = new BookModel(book);

    await serviceContainer.connectionAI.uploadBookForIA(newBook);

    await newBook.save();
  }

  // ? método para obtener todo los libros en la base de datos ✅
  async getAllBooks(): Promise<SearchedBook[]> {
    const books = await BookModel.find();

    return books;
  }

  // ? método para eliminar libro en la base de datos en base a su id 🔄️
  async deleteBook(id: Types.ObjectId): Promise<void> {
    await BookModel.findOneAndDelete(id);
  }

  // ? método para obtener un libro en la base de datos en base a su id ✅
  async getBookById(id: Types.ObjectId): Promise<SearchedBook | null> {
    const book: SearchedBook | null = await BookModel.findById(id);

    if (!book) return null;

    return book;
  }

  // ? método para obtener libros en la base de datos en base a una o varias palabras clave ✅
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

  // ? método que permite obtener el contenido del libro en base a su id ✅
  async getContentBookById(id: Types.ObjectId): Promise<string | null> {
    const book: SearchedBook | null = await BookModel.findById(id);

    if (!book) return null;

    return book.contentBook.url_secura;
  }

  // ? método que permite obtener todos los libro en base al nivel de lectura del usuario ✅
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

  // ? método que permite obtener libros en base a los filtros proporcionados de tema, subgénero, año del libro y genero ✅
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

  // ? método que permite obtener libros en base a una lista de ids proporcionados ✅
  async getBooksByIds(ids: Types.ObjectId[]): Promise<SearchedBook[]> {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
    const books = await BookModel.find({ _id: { $in: objectIds } });
    return books;
  }
}

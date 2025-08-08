import { Types } from "mongoose";
import { Books } from "./books";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";

// ? Interfaz que define las operaciones del repositorio de libros
export interface BooksRepository {
  createBook(book: Books): Promise<void>;
  getAllBooks(): Promise<SearchedBook[]>;
  deleteBook(id: Types.ObjectId): Promise<void>;
  getBookById(id: Types.ObjectId): Promise<SearchedBook | null>;
  getIntelligenceBook(id: string[]): Promise<SearchedBook[]>;
  getContentBookById(id: Types.ObjectId): Promise<string | null>;
  getAllBooksByLevel(nivel?: string): Promise<SearchedBook[]>;
  getBooksByFiltering(theme: string[], subgenre: string[], yearBook: Date[], genre: string[]): Promise<SearchedBook[]>;
  getBooksByIds(ids: Types.ObjectId[]): Promise<SearchedBook[]>;
}

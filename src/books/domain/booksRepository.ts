import { Types } from "mongoose";
import { Books } from "./books";
import { SearchedBook } from "../../types/bookTypes";

// ? Interfaz que define las operaciones del repositorio de libros
export interface BooksRepository {
  createBook(book: Books): Promise<void>;
  getAllBooks(): Promise<SearchedBook[]>;
  deleteBook(id: Types.ObjectId): Promise<void>;
  getBookById(id: Types.ObjectId): Promise<SearchedBook | null>;
  getIntelligenceBook(query: string): Promise<SearchedBook[]>;
  getBooksBySubgenre(subgenre: string[]): Promise<SearchedBook[]>;
  getContentBookById(id: Types.ObjectId): Promise<string | null>;
  getBookByTheme(theme: string[]): Promise<SearchedBook[]>;
  getAllBooksByLevel(nivel?: string): Promise<SearchedBook[]>;
}

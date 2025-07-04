import { Types } from "mongoose";
import { Books } from "./books";
import { SearchedBook } from "../types/bookTypes";

// ? Interfaz que define las operaciones del repositorio de libros
export interface BooksRepository {
  createBook(book: Books): Promise<void>;
  getAllBooks(): Promise<Books[]>;
  deleteBook(id: Types.ObjectId): Promise<void>;
  getBookById(id: Types.ObjectId): Promise<SearchedBook | null>;
  getIntelligenceBook(query: string): Promise<Books[]>;
  getBooksBySubgenre(subgenre: string[]): Promise<Books[]>;
  getContentBookById(id: Types.ObjectId): Promise<string | null>;
  getBookByTheme(theme: string[]): Promise<Books[]>;
}

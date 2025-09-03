import { Types } from "mongoose";
import { Books } from "./books";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";

export interface BooksRepository {
  createBook(book: Books): Promise<void>;
  getAllBooks(): Promise<SearchedBook[]>;
  deleteBook(id: Types.ObjectId): Promise<void>;
  getBookById(id: Types.ObjectId): Promise<SearchedBook | null>;
  getIntelligenceBook(id: string[]): Promise<SearchedBook[]>;
  getContentBookById(id: Types.ObjectId): Promise<string | null>;
  getAllBooksByLevel(nivel?: string): Promise<SearchedBook[]>;
  getBooksByFiltering(theme: string[], subgenre: string[], yearBook: string[], genre: string[], format: string[]): Promise<SearchedBook[]>;
  getBooksByIds(ids: Types.ObjectId[]): Promise<SearchedBook[]>;
  getAllThemes(): Promise<string[]>;
  getAllSubgenres(): Promise<string[]>;
  getAllYears(): Promise<number[]>;
  getAllGenres(): Promise<string[]>;
  getAllFormats(): Promise<string[]>;
}

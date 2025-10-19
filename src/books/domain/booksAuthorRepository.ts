// repositories/booksAuthorRepository.ts
import { Types } from "mongoose";
import { BookSearch } from "../../shared/types/bookTypes/bookTypes";

export interface BooksAuthorRepository {
  getBookByAuthorId(idAuthor: Types.ObjectId): Promise<BookSearch[]>;
}
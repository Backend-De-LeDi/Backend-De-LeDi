// repositories/booksCrudRepository.ts
import { Types } from "mongoose";
import { Books } from "./entities/books";
import { BookSearch } from "../../shared/types/bookTypes/bookTypes";

export interface BooksCrudRepository {
     createBook(book: Books): Promise<void>;
     getAllBooks(): Promise<BookSearch[]>;
     updateBookById(id: Types.ObjectId, book: Partial<Books>): Promise<void>;
     deleteBook(id: Types.ObjectId): Promise<BookSearch | null>;
     getBookById(id: Types.ObjectId): Promise<BookSearch | null>;
}
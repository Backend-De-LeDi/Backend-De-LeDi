import { Books } from "./books";

export interface BooksRepository {
  createBook(book: Books): Promise<void>;
  // getAllBooks(): Promise<Books[]>;
  // getBookById(id: ObjectId): Promise<Books | null>;
  // delete(id: ObjectId): Promise<void>;
}

import { BookModel } from "./model/books.model";
import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";

export class MongoBookRepository implements BooksRepository {
  async createBook(book: Books): Promise<void> {
    const newBook = new BookModel(book);
    await newBook.save();
  }
}

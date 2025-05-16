import { BookModel } from "./model/books.model";
import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";

export class MongoBookRepository implements BooksRepository {
  /*
  método de repositorio que es para crear o almacenar un nuevo libro
  */

  async createBook(book: Books): Promise<void> {
    const newBook = new BookModel(book);
    await newBook.save();
  }

  /*
  método para obtener todo los libros en la base de datos
   */

  async getAllBooks(): Promise<Books[]> {
    const books = await BookModel.find();
    return books;
  }
}

import { BookModel } from "./model/books.model";
import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";
import { Types } from "mongoose";
import { SearchedBook } from "../../types/bookTypes";

export class MongoBookRepository implements BooksRepository {
  //método de repositorio que es para crear o almacenar un nuevo libro
  async createBook(book: Books): Promise<void> {
    const newBook = new BookModel(book);
    await newBook.save();
  }

  //método para obtener todo los libros en la base de datos
  async getAllBooks(): Promise<Books[]> {
    const books = await BookModel.find();
    return books;
  }

  // método para eliminar libro en la base de datos en base a su id
  async deleteBook(id: Types.ObjectId): Promise<void> {
    await BookModel.findOneAndDelete(id);
  }

  // método para obtener un libro en la base de datos en base a su id
  async getBookById(id: Types.ObjectId): Promise<SearchedBook | null> {
    const book: SearchedBook | null = await BookModel.findById(id);
    if (!book) {
      return null;
    }
    return book;
  }
}

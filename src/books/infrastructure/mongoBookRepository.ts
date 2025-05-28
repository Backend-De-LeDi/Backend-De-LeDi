import { BookModel } from "./model/books.model";
import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";
import { Types } from "mongoose";
import { BookContent, SearchedBook } from "../../types/bookTypes";
import ContentBook from "./model/contentBookModel";

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

  async getIntelligenceBook(query: string): Promise<Books[]> {
    // const books = await BookModel.find({ tile: { $search: `"${query}"` } });
    let resBooks = await BookModel.find({ title: { $regex: query, $options: "i" } });

    if (resBooks.length === 0) {
      resBooks = await BookModel.find({ author: { $regex: query, $options: "i" } });
    }

    if (resBooks.length === 0) {
      resBooks = await BookModel.find({
        $or: [{ descriptions: { $regex: query, $options: "i" } }, { summary: { $regex: query, $options: "i" } }],
      });
    }

    return resBooks;
  }

  async getBooksByCategory(category: string[]): Promise<Books[]> {
    const books = await BookModel.find({ category: { $in: category } });
    return books;
  }

  async getContentBookById(id: Types.ObjectId): Promise<string | null> {
    const fullBook: SearchedBook | null = await BookModel.findById(id);
    if (fullBook === null) return null;

    const contentBook = await ContentBook.findById(fullBook.content);
    if (contentBook === null) return null;

    return contentBook.path;
  }
}

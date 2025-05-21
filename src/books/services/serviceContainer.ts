import { BookCreate } from "../application/createBook";
import { DeleteBook } from "../application/deleteBook";
import { getAllBooks } from "../application/getAllBooks";
import { getBooksById } from "../application/getBookById";
import { MongoBookRepository } from "../infrastructure/mongoBookRepository";

const booksRepository = new MongoBookRepository();

export const serviceContainer = {
  book: {
    createBook: new BookCreate(booksRepository),
    getAllBooks: new getAllBooks(booksRepository),
    deleteBook: new DeleteBook(booksRepository),
    getBooksById: new getBooksById(booksRepository),
  },
};

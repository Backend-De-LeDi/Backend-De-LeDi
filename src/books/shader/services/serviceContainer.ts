import { BookCreate } from "../../application/createBook/createBook";
import { DeleteBook } from "../../application/deleteBook/deleteBook";
import { getAllBooks } from "../../application/getAllBooks/getAllBooks";
import { getBooksById } from "../../application/getBookById/getBookById";
import { MongoBookRepository } from "../../infrastructure/mongoBookRepository";

const booksRepository = new MongoBookRepository();

export const serviceContainer = {
  book: {
    createBook: new BookCreate(booksRepository),
    getAllBooks: new getAllBooks(booksRepository),
    deleteBook: new DeleteBook(booksRepository),
    getBooksById: new getBooksById(booksRepository),
  },
};

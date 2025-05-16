import { BookCreate } from "../../application/createBook/createBook";
import { getAllBooks } from "../../application/getAllBooks/getAllBooks";
import { MongoBookRepository } from "../../infrastructure/mongoBookRepository";

const booksRepository = new MongoBookRepository();

export const serviceContainer = {
  book: {
    createBook: new BookCreate(booksRepository),
    getAllBooks: new getAllBooks(booksRepository),
  },
};

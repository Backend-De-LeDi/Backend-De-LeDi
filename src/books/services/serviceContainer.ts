import { BookCreate } from "../application/createBook";
import { DeleteBook } from "../application/deleteBook";
import { GetAllBooks } from "../application/getAllBooks";
import { GetBooksById } from "../application/getBookById";
import { GetBookByCategory } from "../application/getBooksByCategory";
import { GetIntelligenceBook } from "../application/getIntelligenceBooks";
import { MongoBookRepository } from "../infrastructure/mongoBookRepository";
import { getContentBookById } from "../application/getContentBookByCategory";

const booksRepository = new MongoBookRepository();

export const serviceContainer = {
  book: {
    createBook: new BookCreate(booksRepository),
    getAllBooks: new GetAllBooks(booksRepository),
    deleteBook: new DeleteBook(booksRepository),
    getBooksById: new GetBooksById(booksRepository),
    getIntelligenceBook: new GetIntelligenceBook(booksRepository),
    getBooksByCategory: new GetBookByCategory(booksRepository),
    getContentById: new getContentBookById(booksRepository),
  },
};

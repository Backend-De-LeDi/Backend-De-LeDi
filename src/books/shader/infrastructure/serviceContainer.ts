import { BookCreate } from "../../application/createBook/createBook";
import { MongoBookRepository } from "../../infrastructure/mongoBookRepository";

const booksRepository = new MongoBookRepository();

export const serviceContainer = {
  book: {
    create: new BookCreate(booksRepository),
  },
};

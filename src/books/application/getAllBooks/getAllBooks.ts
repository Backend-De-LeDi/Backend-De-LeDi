import { Books } from "../../domain/books";
import { BooksRepository } from "../../domain/booksRepository";

export class getAllBooks {
  constructor(private repository: BooksRepository) {}
  async run(): Promise<Books[]> {
    return this.repository.getAllBooks();
  }
}

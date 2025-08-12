import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";

export class GetAllBooks {
  constructor(private repository: BooksRepository) {}

  async run(): Promise<SearchedBook[]> {
    return await this.repository.getAllBooks();
  }
}

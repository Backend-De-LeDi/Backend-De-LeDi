import { Books } from "../domain/books";
import { BooksRepository } from "../domain/booksRepository";

class GetBooksByGenreTypes {
  constructor(private repository: BooksRepository) {}

  async run(): Promise<Books[]> {}
}

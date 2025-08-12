import { Books } from "../domain/books";
import { BooksRepository } from "../domain/booksRepository";

export class CreateBook {
  constructor(private repository: BooksRepository) {}

  async run(newBookData: Books): Promise<void> {
    await this.repository.createBook(newBookData);
  }
}

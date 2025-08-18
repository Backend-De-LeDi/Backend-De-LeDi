import { BooksRepository } from "../domain/booksRepository";

export class getAllFormats {
  constructor(private booksRepository: BooksRepository) {}

  async run(): Promise<string[]> {
    return this.booksRepository.getAllFormats();
  }
}

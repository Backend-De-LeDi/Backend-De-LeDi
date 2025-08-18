import { BooksRepository } from "../domain/booksRepository";

export class GetAllGenres {
  constructor(private booksRepository: BooksRepository) {}

  async run(): Promise<string[]> {
    const subgenres = await this.booksRepository.getAllGenres();
    return subgenres;
  }
}

import { BooksRepository } from "../domain/booksRepository";

export class GetAllThemes {
  constructor(private booksRepository: BooksRepository) {}

  async run(): Promise<string[]> {
    const themes = await this.booksRepository.getAllThemes();
    return themes;
  }
}

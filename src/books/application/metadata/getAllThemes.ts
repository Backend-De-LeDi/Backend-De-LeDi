import { BooksMetadataRepository } from "../../domain/booksMetadataRepository";


export class GetAllThemes {
  constructor(private booksRepository: BooksMetadataRepository) { }

  async run(): Promise<string[]> {
    const themes = await this.booksRepository.getAllThemes();
    return themes;
  }
}

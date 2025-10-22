import { BooksMetadataRepository } from "../../domain/booksMetadataRepository";

export class GetAllGenres {
  constructor(private booksRepository: BooksMetadataRepository) { }

  async run(): Promise<string[]> {
    const subgenres = await this.booksRepository.getAllGenres();
    return subgenres;
  }
}

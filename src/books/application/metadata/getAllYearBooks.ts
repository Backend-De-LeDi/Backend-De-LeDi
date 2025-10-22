import { BooksMetadataRepository } from "../../domain/booksMetadataRepository";

export class GetAllYearsBooks {
  constructor(private booksRepository: BooksMetadataRepository) { }

  async run(): Promise<string[]> {
    const subgenres = await this.booksRepository.getAllYears();
    return subgenres;
  }
}

import { BooksMetadataRepository } from "../../domain/booksMetadataRepository";

export class GetAllFormats {
  constructor(private booksRepository: BooksMetadataRepository) { }

  async run(): Promise<string[]> {
    return this.booksRepository.getAllFormats();
  }
}

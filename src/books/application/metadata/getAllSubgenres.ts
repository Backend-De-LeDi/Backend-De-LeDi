import { BooksMetadataRepository } from "../../domain/booksMetadataRepository";


export class GetAllSubgenres {
  constructor(private booksRepository: BooksMetadataRepository) { }

  async run(): Promise<string[]> {
    const subgenres = await this.booksRepository.getAllSubgenres();
    return subgenres;
  }
}

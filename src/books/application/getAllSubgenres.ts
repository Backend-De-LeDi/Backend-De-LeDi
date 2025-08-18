import { BooksRepository } from "../domain/booksRepository";

export class GetAllSubgenres {
  constructor(private booksRepository: BooksRepository) {}

  async run(): Promise<string[]> {
    const subgenres = await this.booksRepository.getAllSubgenres();
    return subgenres;
  }
}

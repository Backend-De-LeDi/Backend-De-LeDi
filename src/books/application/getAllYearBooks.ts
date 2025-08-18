import { BooksRepository } from "../domain/booksRepository";

export class GetAllYearsBooks {
  constructor(private booksRepository: BooksRepository) {}

  async run(): Promise<number[]> {
    const subgenres = await this.booksRepository.getAllYears();
    return subgenres;
  }
}

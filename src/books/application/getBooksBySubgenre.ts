import { BooksRepository } from "../domain/booksRepository";
export class GetBooksBySubgenre {
  constructor(private repository: BooksRepository) {}

  async run(subgenre: string[]) {
    return await this.repository.getBooksBySubgenre(subgenre);
  }
}

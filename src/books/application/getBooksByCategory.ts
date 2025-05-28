import { BooksRepository } from "../domain/booksRepository";
export class GetBookByCategory {
  constructor(private repository: BooksRepository) {}

  async run(category: string[]) {
    return await this.repository.getBooksByCategory(category);
  }
}

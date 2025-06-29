import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";

export class GetIntelligenceBook {
  constructor(private repository: BooksRepository) {}

  async run(query: string): Promise<Books[]> {
    return await this.repository.getIntelligenceBook(query);
  }
}

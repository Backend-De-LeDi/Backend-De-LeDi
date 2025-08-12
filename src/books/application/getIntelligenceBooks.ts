import { BooksRepository } from "../domain/booksRepository";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";

export class GetIntelligenceBook {
  constructor(private repository: BooksRepository) {}

  async run(id: string[]): Promise<SearchedBook[]> {
    return await this.repository.getIntelligenceBook(id);
  }
}

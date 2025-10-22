import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { BooksQueryRepository } from "../../domain/booksQueryRepository";

export class GetIntelligenceBook {
  constructor(private repository: BooksQueryRepository) { }

  async run(id: string[]): Promise<BookSearch[]> {
    return await this.repository.getIntelligenceBook(id);
  }
}

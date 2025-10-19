import { BooksQueryRepository } from "../../domain/booksQueryRepository";
import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";

export class GetAllBooksByLevel {
  constructor(private readonly booksRepository: BooksQueryRepository) { }

  async run(nivel?: string): Promise<BookSearch[]> {
    const books = await this.booksRepository.getAllBooksByLevel(nivel);

    return books;
  }
}

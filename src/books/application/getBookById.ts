import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";

export class GetBooksById {
  constructor(private repository: BooksRepository) {}

  async run(id: Types.ObjectId): Promise<SearchedBook | null> {
    return await this.repository.getBookById(id);
  }
}

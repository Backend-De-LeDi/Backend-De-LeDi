import { Types } from "mongoose";
import { SearchedBook } from "../../../types/bookTypes";
import { BooksRepository } from "../../domain/booksRepository";

export class getBooksById {
  constructor(private repository: BooksRepository) {}

  async run(id: Types.ObjectId): Promise<SearchedBook | null> {
    return await this.repository.getBookById(id);
  }
}

import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";

export class GetBookByProgress {
  constructor(private repository: BooksRepository) {}

  async run(id: Types.ObjectId): Promise<SearchedBook[]> {
    return this.repository.getBookByProgreses(id);
  }
}

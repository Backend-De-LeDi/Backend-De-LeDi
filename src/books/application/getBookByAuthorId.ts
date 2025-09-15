import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";

export class GetBookByAuthorId {
  constructor(private repository: BooksRepository) {}

  async run(idsAuthor: Types.ObjectId): Promise<SearchedBook[]> {
    return await this.repository.getBookByAuthorId(idsAuthor);
  }
}

import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";
import { Types } from "mongoose";

export class GetBooksByIds {
  constructor(private booksRepository: BooksRepository) { }

  async run(ids: Types.ObjectId[]): Promise<SearchedBook[]> {
    return await this.booksRepository.getBooksByIds(ids);
  }
}

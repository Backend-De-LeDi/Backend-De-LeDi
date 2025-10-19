import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { BooksQueryRepository } from "../../domain/booksQueryRepository";
import { Types } from "mongoose";

export class GetBooksByIds {
  constructor(private booksRepository: BooksQueryRepository) { }

  async run(ids: Types.ObjectId[]): Promise<BookSearch[]> {
    return await this.booksRepository.getBooksByIds(ids);
  }
}

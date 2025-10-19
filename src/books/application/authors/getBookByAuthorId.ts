import { Types } from "mongoose";
import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { BooksAuthorRepository } from "../../domain/booksAuthorRepository";

export class GetBookByAuthorId {
  constructor(private repository: BooksAuthorRepository) { }

  async run(idsAuthor: Types.ObjectId): Promise<BookSearch[]> {
    return await this.repository.getBookByAuthorId(idsAuthor);
  }
}

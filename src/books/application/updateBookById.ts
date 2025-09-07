import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";

export class UpdateBooksById {
     constructor(private repository: BooksRepository) { }
     async run(id: Types.ObjectId, book: Partial<SearchedBook>) {
          await this.repository.updateBookById(id, book);
     }
}
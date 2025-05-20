import { BooksRepository } from "../domain/booksRepository";
import { Types } from "mongoose";

export class DeleteBook {
  constructor(private repository: BooksRepository) {}
  async run(id: Types.ObjectId): Promise<void> {
    this.repository.deleteBook(id);
  }
}

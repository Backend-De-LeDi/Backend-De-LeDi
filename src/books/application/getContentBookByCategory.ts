import { Types } from "mongoose";
import { BooksRepository } from "../domain/booksRepository";

export class getContentBookById {
  constructor(private repository: BooksRepository) {}
  async run(id: Types.ObjectId): Promise<string | null> {
    return await this.repository.getContentBookById(id);
  }
}

import { Types } from "mongoose";
import { BooksRepository } from "../domain/booksRepository";

export class GetContentBookById {
  constructor(private repository: BooksRepository) {}
  async run(id: Types.ObjectId): Promise<string | null> {
    return await this.repository.getContentBookById(id);
  }
}

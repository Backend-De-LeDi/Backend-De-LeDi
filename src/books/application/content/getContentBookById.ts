import { Types } from "mongoose";
import { BooksQueryRepository } from "../../domain/booksQueryRepository"

export class GetContentBookById {
  constructor(private repository: BooksQueryRepository) { }

  async run(id: Types.ObjectId): Promise<string | null> {
    return await this.repository.getContentBookById(id);
  }
}

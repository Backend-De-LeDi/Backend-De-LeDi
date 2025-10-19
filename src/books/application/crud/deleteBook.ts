import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { BooksCrudRepository } from "../../domain/booksCrudRepository";
import { Types } from "mongoose";

export class DeleteBook {
  constructor(private repository: BooksCrudRepository) { }

  async run(id: Types.ObjectId): Promise<BookSearch | null> {
    return await this.repository.deleteBook(id);
  }
}

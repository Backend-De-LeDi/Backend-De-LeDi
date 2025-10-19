import { Types } from "mongoose";
import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { BooksCrudRepository } from "../../domain/booksCrudRepository";

export class UpdateBooksById {
     constructor(private repository: BooksCrudRepository) { }
     async run(id: Types.ObjectId, book: Partial<BookSearch>) {
          await this.repository.updateBookById(id, book);
     }
}
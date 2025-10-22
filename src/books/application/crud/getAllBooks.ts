import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { BooksCrudRepository } from "../../domain/booksCrudRepository";

export class GetAllBooks {
  constructor(private repository: BooksCrudRepository) { }

  async run(): Promise<BookSearch[]> {
    return await this.repository.getAllBooks();
  }
}

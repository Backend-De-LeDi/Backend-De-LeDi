import { Books } from "../../domain/entities/books";
import { BooksCrudRepository } from "../../domain/booksCrudRepository";

export class CreateBook {
  constructor(private repository: BooksCrudRepository) { }

  async run(newBookData: Books): Promise<void> {
    await this.repository.createBook(newBookData);
  }
}

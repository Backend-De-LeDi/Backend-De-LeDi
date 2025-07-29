import { BooksRepository } from "../domain/booksRepository";
import { Types } from "mongoose";

// ? Clase que guía al Repositorio a realizar la eliminación del libro
export class DeleteBook {
  constructor(private repository: BooksRepository) {}

  async run(id: Types.ObjectId): Promise<void> {
    await this.repository.deleteBook(id);
  }
}

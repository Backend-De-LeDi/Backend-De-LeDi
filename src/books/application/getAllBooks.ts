import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";

// ? Clase que guía al Repositorio a realizar la obtención de todos los libros
export class GetAllBooks {
  constructor(private repository: BooksRepository) {}

  async run(): Promise<SearchedBook[]> {
    return await this.repository.getAllBooks();
  }
}

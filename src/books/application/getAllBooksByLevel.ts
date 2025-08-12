import { BooksRepository } from "../domain/booksRepository";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";

export class GetAllBooksByLevel {
  constructor(private readonly booksRepository: BooksRepository) {}

  async run(nivel?: string): Promise<SearchedBook[]> {
    // * Si no se proporciona un nivel, se obtienen todos los libros sin filtrar
    const books = await this.booksRepository.getAllBooksByLevel(nivel);

    // * se retornan los libros obtenidos
    return books;
  }
}

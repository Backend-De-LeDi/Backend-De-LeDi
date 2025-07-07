import { BooksRepository } from "../domain/booksRepository";
import { SearchedBook } from "../../types/bookTypes";

// ? Clase que implementa la lógica para obtener todos los libros por nivel
export class GetAllBooksByLevel {
  constructor(private readonly booksRepository: BooksRepository) {}

  async run(nivel?: string): Promise<SearchedBook[]> {
    // * Si no se proporciona un nivel, se obtienen todos los libros sin filtrar
    const books = await this.booksRepository.getAllBooksByLevel(nivel);

    // * se retornan los libros obtenidos
    return books;
  }
}

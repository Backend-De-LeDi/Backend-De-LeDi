import { SearchedBook } from "../../types/bookTypes/bookTypes";
import { Books } from "../domain/books";
import { BooksRepository } from "../domain/booksRepository";

// ? clase que guía al Repositorio a realizar la obtención de libros por tema
export class GetBookByTheme {
  // * constructor que recibe el repositorio de libros
  constructor(private repository: BooksRepository) {}

  // * método que se encarga de ejecutar la lógica de obtención de libros por tema
  async run(theme: string[]): Promise<SearchedBook[]> {
    // * se hace uso del repositorio para obtener los libros por tema
    const books = await this.repository.getBookByTheme(theme);

    // * si no hay libros, se retorna un array vacío
    if (!books) return [];

    // * si hay libros, se retornan
    return books;
  }
}

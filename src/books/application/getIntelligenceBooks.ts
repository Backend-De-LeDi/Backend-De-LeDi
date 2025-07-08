import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";
import { SearchedBook } from "../../types/bookTypes/bookTypes";

// ? Clase que guía al Repositorio a realizar la obtención de libros por inteligencia
export class GetIntelligenceBook {
  // * Constructor que recibe el repositorio de libros
  constructor(private repository: BooksRepository) {}

  // * Método que ejecuta la obtención de libros por inteligencia
  async run(query: string): Promise<SearchedBook[]> {
    // * Llama al repositorio para obtener los libros por inteligencia
    return await this.repository.getIntelligenceBook(query);
  }
}

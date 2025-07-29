import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";

// ? Clase que guía al Repositorio a realizar la obtención de libros por inteligencia
export class GetIntelligenceBook {
  constructor(private repository: BooksRepository) {}

  // * Método que ejecuta la obtención de libros por inteligencia
  async run(id: string[]): Promise<SearchedBook[]> {
    return await this.repository.getIntelligenceBook(id);
  }
}

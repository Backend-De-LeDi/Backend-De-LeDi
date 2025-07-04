import { Types } from "mongoose";
import { SearchedBook } from "../../types/bookTypes";
import { BooksRepository } from "../domain/booksRepository";

// ? Clase que guía al Repositorio a realizar la obtención de un libro por su ID
export class GetBooksById {
  // * Constructor que recibe el repositorio de libros
  constructor(private repository: BooksRepository) {}

  // * Método que ejecuta la obtención del libro por su ID
  async run(id: Types.ObjectId): Promise<SearchedBook | null> {
    // * Llama al repositorio para obtener el libro por su ID
    return await this.repository.getBookById(id);
  }
}

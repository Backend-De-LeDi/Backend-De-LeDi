import { Books } from "../domain/books";
import { BooksRepository } from "../domain/booksRepository";
import type { Types } from "mongoose";

// ? clase que guía al Repositorio a realizar el almacenamiento del libro
export class CreateBook {
  // * inyectamos el repositorio de libros
  constructor(private repository: BooksRepository) {}

  // * método que crea un libro y lo almacena en la base de datos
  async run(newBookData: Books): Promise<void> {
    // * creamos una instancia del libro con los datos proporcionados

    // * llamamos al repositorio para crear el libro en la base de datos
    await this.repository.createBook(newBookData);
  }
}

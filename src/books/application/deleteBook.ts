import { BooksRepository } from "../domain/booksRepository";
import { Types } from "mongoose";

// ? Clase que guía al Repositorio a realizar la eliminación del libro
export class DeleteBook {

  // * Constructor que recibe el repositorio de libros
  constructor(private repository: BooksRepository) {}

  // * Método que ejecuta la eliminación del libro por su ID
  async run(id: Types.ObjectId): Promise<void> {

    // * Llama al repositorio para eliminar el libro
    await this.repository.deleteBook(id);
  
  }
}

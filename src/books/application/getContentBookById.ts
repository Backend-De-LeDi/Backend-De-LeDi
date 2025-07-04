import { Types } from "mongoose";
import { BooksRepository } from "../domain/booksRepository";

// ? Clase que guía al Repositorio a realizar la obtención del contenido de un libro por su ID
export class GetContentBookById {

  // * Constructor que recibe el repositorio de libros
  constructor(private repository: BooksRepository) {}

  // * Método que ejecuta la obtención del contenido del libro por su ID
  async run(id: Types.ObjectId): Promise<string | null> {

    // * Llama al repositorio para obtener el contenido del libro por su ID
    return await this.repository.getContentBookById(id);

  }
}

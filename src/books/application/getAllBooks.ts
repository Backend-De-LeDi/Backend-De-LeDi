import { Books } from "../domain/books";
import { BooksRepository } from "../domain/booksRepository";

// ? Clase que guía al Repositorio a realizar la obtención de todos los libros
export class GetAllBooks {

  // * Constructor que recibe el repositorio de libros
  constructor(private repository: BooksRepository) {}

  // * Método que ejecuta la obtención de todos los libros
  async run(): Promise<Books[]> {

    // * Llama al repositorio para obtener todos los libros
    return await this.repository.getAllBooks();

    
  }
}

import { BooksRepository } from "../domain/booksRepository";

// ? Clase que guía al Repositorio a realizar la obtención de libros por subgénero
export class GetBooksBySubgenre {

  // * Constructor que recibe el repositorio de libros
  constructor(private repository: BooksRepository) {}

  // * Método que ejecuta la obtención de libros por subgénero
  async run(subgenre: string[]) {

    // * Llama al repositorio para obtener los libros por subgénero
    return await this.repository.getBooksBySubgenre(subgenre);

    
  }
}

// * importación del domino que es lo que se devolverá en la aplicación de uso GetBookByGenreTypes
import { Books } from "../domain/books";

// * importación del repositorio para hacer el uso de su método getBookGenreTypes 
import { BooksRepository } from "../domain/booksRepository";

// * aplicación de uso que recibe un repositorio para hacer uso de su método
export class GetBooksByGenreTypes {

  constructor(private repository: BooksRepository) {}

  async run(genreType: string): Promise<Books[]> {
  
    return await this.repository.getBookByGenreTypes(genreType);
  
  }
}

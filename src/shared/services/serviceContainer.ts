import { BookCreate } from "../../books/application/createBook";
import { DeleteBook } from "../../books/application/deleteBook";
import { GetAllBooks } from "../../books/application/getAllBooks";
import { GetBooksById } from "../../books/application/getBookById";
import { GetBooksBySubgenre } from "../../books/application/getBooksBySubgenre";
import { GetIntelligenceBook } from "../../books/application/getIntelligenceBooks";
import { MongoBookRepository } from "../../books/infrastructure/mongoBookRepository";
import { GetContentBookById } from "../../books/application/getContentBookById";
import { CreateAudioBooks } from "../../audiobooks/applications/createAudiobooks";
import { MongoAudiobooksRepository } from "../../audiobooks/infrastructure/mongoAudioBooksRepository";
import { GetAllAudiobooks } from "../../audiobooks/applications/getAllAudiobooks";
import { DeleteAudiobook } from "../../audiobooks/applications/deleteAudiobook";
import { GetAudiobooksById } from "../../audiobooks/applications/getAudiobookById";

// * repositorio de la base de datos para uso de sus métodos de almacenamiento
const booksRepository = new MongoBookRepository();
const audiobooksRepository = new MongoAudiobooksRepository();

// * contenedor que combina las aplicaciones de uso con los repositorios
export const serviceContainer = {
  
  // * métodos de solo libros
  book: {
    createBooks: new BookCreate(booksRepository),
    getAllBooks: new GetAllBooks(booksRepository),
    deleteBook: new DeleteBook(booksRepository),
    getBooksById: new GetBooksById(booksRepository),
    getIntelligenceBook: new GetIntelligenceBook(booksRepository),
    getBooksBySubgenre: new GetBooksBySubgenre(booksRepository),
    getContentById: new GetContentBookById(booksRepository),
  },

  // * métodos de solo audiolibros
  audiobooks: {
    createAudioBooks: new CreateAudioBooks(audiobooksRepository),
    getAllAudioBooks: new GetAllAudiobooks(audiobooksRepository),
    deleteAudiobook: new DeleteAudiobook(audiobooksRepository),
    getAudiobookById: new GetAudiobooksById(audiobooksRepository),

  },
};

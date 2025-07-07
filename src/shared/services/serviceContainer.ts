import { CreateBook } from "../../books/application/createBook";
import { DeleteBook } from "../../books/application/deleteBook";
import { GetAllBooks } from "../../books/application/getAllBooks";
import { GetBooksById } from "../../books/application/getBookById";
import { GetBooksBySubgenre } from "../../books/application/getBooksBySubgenre";
import { GetIntelligenceBook } from "../../books/application/getIntelligenceBooks";
import { MongoAudiobookRepository } from "../../audiobooks/infrastructure/mongoAudiobookRepository";
import { GetContentBookById } from "../../books/application/getContentBookById";
import { CreateAudiobook } from "../../audiobooks/application/createAudiobook";
import { GetAllAudiobooks } from "../../audiobooks/application/getAllAudiobooks";
import { DeleteAudiobook } from "../../audiobooks/application/deleteAudiobook";
import { GetAudiobooksById } from "../../audiobooks/application/getAudiobookById";
import { GetBookByTheme } from "../../books/application/getBooksByTheme";
import { MongoBookRepository } from "../../books/infrastructure/mongoBookRepository";
import { GetAllBooksByLevel } from "../../books/application/getAllBooksByLevel";

// * repositorio de la base de datos para uso de sus métodos de almacenamiento
const booksRepository = new MongoBookRepository();
const audiobooksRepository = new MongoAudiobookRepository();

// ? contenedor que combina las aplicaciones de uso con los repositorios
export const serviceContainer = {
  // * métodos de solo libros
  book: {
    createBooks: new CreateBook(booksRepository),
    getAllBooks: new GetAllBooks(booksRepository),
    deleteBook: new DeleteBook(booksRepository),
    getBooksById: new GetBooksById(booksRepository),
    getIntelligenceBook: new GetIntelligenceBook(booksRepository),
    getBooksBySubgenre: new GetBooksBySubgenre(booksRepository),
    getContentById: new GetContentBookById(booksRepository),
    getBookByTheme: new GetBookByTheme(booksRepository),
    getAllBooksByLevel: new GetAllBooksByLevel(booksRepository),
  },

  // * métodos de solo audiolibros
  audiobooks: {
    createAudioBooks: new CreateAudiobook(audiobooksRepository),
    getAllAudioBooks: new GetAllAudiobooks(audiobooksRepository),
    deleteAudiobook: new DeleteAudiobook(audiobooksRepository),
    getAudiobookById: new GetAudiobooksById(audiobooksRepository),
  },
};

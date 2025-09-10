import { CreateBook } from "../../books/application/createBook";
import { DeleteBook } from "../../books/application/deleteBook";
import { GetAllBooks } from "../../books/application/getAllBooks";
import { GetBooksById } from "../../books/application/getBookById";
import { GetIntelligenceBook } from "../../books/application/getIntelligenceBooks";
import { GetContentBookById } from "../../books/application/getContentBookById";
import { MongoBookRepository } from "../../books/infrastructure/mongoBookRepository";
import { GetAllBooksByLevel } from "../../books/application/getAllBooksByLevel";
import { GetBooksByFiltering } from "../../books/application/getBooksByFiltering";
import { GetBooksByIds } from "../../books/application/getBooksByIds";
// import { ConnectionAI } from "../../shared/apis/connectionAi";
import { GetAllThemes } from "../../books/application/getAllThemes";
import { GetAllSubgenres } from "../../books/application/getAllSubgenres";
import { GetAllGenres } from "../../books/application/getAllGenres";
import { GetAllYearsBooks } from "../../books/application/getAllYearBooks";
import { getAllFormats } from "../../books/application/getAllFormats";
import { UpdateBooksById } from "../../books/application/updateBookById";

// * repositorio de la base de datos para uso de sus métodos de almacenamiento
const booksRepository = new MongoBookRepository();

// ? contenedor que combina las aplicaciones de uso con los repositorios
export const serviceContainer = {
  // * métodos de solo libros
  book: {
    createBooks: new CreateBook(booksRepository),
    getAllBooks: new GetAllBooks(booksRepository),
    deleteBook: new DeleteBook(booksRepository),
    getBooksById: new GetBooksById(booksRepository),
    getIntelligenceBook: new GetIntelligenceBook(booksRepository),
    getContentById: new GetContentBookById(booksRepository),
    getAllBooksByLevel: new GetAllBooksByLevel(booksRepository),
    getBooksByFiltering: new GetBooksByFiltering(booksRepository),
    getBooksByIds: new GetBooksByIds(booksRepository),
    getAllThemes: new GetAllThemes(booksRepository),
    getAllSubgenres: new GetAllSubgenres(booksRepository),
    getAllGenres: new GetAllGenres(booksRepository),
    getAllYears: new GetAllYearsBooks(booksRepository),
    getAllFormats: new getAllFormats(booksRepository),
    updateBooksById: new UpdateBooksById(booksRepository),
  },

  // * método de IA
  // ConnectionAI: new ConnectionAI(),
};

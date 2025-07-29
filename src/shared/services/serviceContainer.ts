import { CreateBook } from "../../books/application/createBook";
import { DeleteBook } from "../../books/application/deleteBook";
import { GetAllBooks } from "../../books/application/getAllBooks";
import { GetBooksById } from "../../books/application/getBookById";
import { GetIntelligenceBook } from "../../books/application/getIntelligenceBooks";
import { MongoAudiobookRepository } from "../../audiobooks/infrastructure/mongoAudiobookRepository";
import { GetContentBookById } from "../../books/application/getContentBookById";
import { CreateAudiobook } from "../../audiobooks/application/createAudiobook";
import { GetAllAudiobooks } from "../../audiobooks/application/getAllAudiobooks";
import { DeleteAudiobook } from "../../audiobooks/application/deleteAudiobook";
import { GetAudiobooksById } from "../../audiobooks/application/getAudiobookById";
import { MongoBookRepository } from "../../books/infrastructure/mongoBookRepository";
import { GetAllBooksByLevel } from "../../books/application/getAllBooksByLevel";
import { GetBooksByFiltering } from "../../books/application/getBooksByFiltering";
import { GetRecommendations } from "../../recommendations/applications/getRecommendations";
import { MongoRecommendationsRepository } from "../../recommendations/infrastructure/mongoRecommendationsRepository";
import { ConnectionAI } from "../apis/connectionAi";

// * repositorio de la base de datos para uso de sus métodos de almacenamiento
const booksRepository = new MongoBookRepository();
const audiobooksRepository = new MongoAudiobookRepository();
const recommendationRepository = new MongoRecommendationsRepository();

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
  },

  // * métodos de solo audiolibros
  audiobooks: {
    createAudioBooks: new CreateAudiobook(audiobooksRepository),
    getAllAudioBooks: new GetAllAudiobooks(audiobooksRepository),
    deleteAudiobook: new DeleteAudiobook(audiobooksRepository),
    getAudiobookById: new GetAudiobooksById(audiobooksRepository),
  },

  // * método de solo recomendaciones
  recommendations: {
    getRecommendations: new GetRecommendations(recommendationRepository),
  },
  // * métodos de solo comunicación con la IA
  connectionAI: new ConnectionAI(),
};

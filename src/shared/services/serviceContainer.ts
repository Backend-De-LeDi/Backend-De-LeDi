import { CreateBook } from "../../books/application/createBook";
import { DeleteBook } from "../../books/application/deleteBook";
import { GetAllBooks } from "../../books/application/getAllBooks";
import { GetBooksById } from "../../books/application/getBookById";
import { GetIntelligenceBook } from "../../books/application/getIntelligenceBooks";
import { GetContentBookById } from "../../books/application/getContentBookById";
import { MongoBookRepository } from "../../books/infrastructure/mongoBookRepository";
import { GetAllBooksByLevel } from "../../books/application/getAllBooksByLevel";
import { GetBooksByFiltering } from "../../books/application/getBooksByFiltering";
import { GetBasicRecommendations } from "../../recommendations/applications/getBasicRecommendations";
import { MongoRecommendationsRepository } from "../../recommendations/infrastructure/mongoRecommendationsRepository";
import { GetBooksByIds } from "../../books/application/getBooksByIds";
import { GetAdvancedRecommendations } from "../../recommendations/applications/getAdvancedRecommendations";
import { ConnectionAI } from "../../shared/apis/connectionAi";

// * repositorio de la base de datos para uso de sus métodos de almacenamiento
const booksRepository = new MongoBookRepository();
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
    getBooksByIds: new GetBooksByIds(booksRepository),
  },

  // * método de solo recomendaciones
  recommendations: {
    getBasicRecommendations: new GetBasicRecommendations(recommendationRepository),
    getAdvancedRecommendations: new GetAdvancedRecommendations(recommendationRepository),
  },

  // * método de IA
  ConnectionAI: new ConnectionAI(),
};

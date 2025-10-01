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
import { GetAllThemes } from "../../books/application/getAllThemes";
import { GetRecommendations } from "../../recommendations/applications/getRecommendations";
import { GetAllSubgenres } from "../../books/application/getAllSubgenres";
import { GetAllGenres } from "../../books/application/getAllGenres";
import { GetAllYearsBooks } from "../../books/application/getAllYearBooks";
import { getAllFormats } from "../../books/application/getAllFormats";
import { UpdateBooksById } from "../../books/application/updateBookById";
import { MongoRecommendationRepository } from "../../recommendations/infrastructures/mongoRecommendationRepository";
import { GetRecommendatioSemantic } from "../../recommendations/applications/getRecommendatioSemantic";
import { GetIdsForRecommendation } from "../../ai/applications/recommendations/getIdsForRecommendation";
import { ConnectionAI } from "../../ai/infrastructure/serviceOfAI";
import { GetCreateYourHistoryGame } from "../../ai/applications/games/getCreateYourHistoryGame";
import { GetBookByAuthorId } from "../../books/application/getBookByAuthorId";
import { CreateEmbedding } from "../../ai/applications/embeddings/createEmbedding";
import { FindProgresByID } from "../../userPogressBooks/aplication/service/FindById.Service";
import { FindProgressMongo } from "../../userPogressBooks/infrastructure/bookProgressRepoMongo";
import { CreateBookContent } from "../../bookContent/application/createBookContent";
import { mongoRepositoryBookContent } from "../../bookContent/infrastructure/moongoRepositoryBookContent";
import { CreateVectorStoreMemory } from "../../ai/applications/vectorStoreMemory.ts/createVectorStoreMemory";
import { GetAllVectorStoresMemoryByIdSession } from "../../ai/applications/vectorStoreMemory.ts/getAllVectorStoresMemoryByIdUser";
import { GetAllVectorStoresMemoryByIdUser } from "../../ai/applications/vectorStoreMemory.ts/getAllVectorStoreMemoryByIdSession";
import { ChatBot } from "../../ai/applications/chatBot/chatBot";

// * repositorio de la base de datos para uso de sus métodos de almacenamiento
const booksRepository = new MongoBookRepository();
const recommendationsRepository = new MongoRecommendationRepository();
const aiService = new ConnectionAI();
const progressRepository = new FindProgressMongo();
const bookContentRepository = new mongoRepositoryBookContent();

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
    getBookByAuthorId: new GetBookByAuthorId(booksRepository),
  },

  // * método de recomendaciones
  recommendations: {
    getRecommendations: new GetRecommendations(recommendationsRepository),
    getRecommendatioSemantic: new GetRecommendatioSemantic(recommendationsRepository),
  },

  ai: {
    getIdsForRecommendation: new GetIdsForRecommendation(aiService),
    getCreateYourHistoryGame: new GetCreateYourHistoryGame(aiService),
    createEmbedding: new CreateEmbedding(aiService),
    createVectorStoreMemory: new CreateVectorStoreMemory(aiService),
    getAllVectorStoresMemoryByIdSession: new GetAllVectorStoresMemoryByIdUser(aiService),
    getAllVectorStoresMemoryByIdUser: new GetAllVectorStoresMemoryByIdUser(aiService),
    chatBot: new ChatBot(aiService)
  },
  progress: {
    findProgres: new FindProgresByID(progressRepository),
  },
  bookContent: {
    createBookContent: new CreateBookContent(bookContentRepository),
  },
};

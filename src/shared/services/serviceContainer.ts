
import { GetRecommendations } from "../../recommendations/applications/getRecommendations";
import { MongoRecommendationRepository } from "../../recommendations/infrastructures/mongoRecommendationRepository";
import { GetRecommendatioSemantic } from "../../recommendations/applications/getRecommendatioSemantic";
import { GetIdsForRecommendation } from "../../ai/applications/recommendations/getIdsForRecommendation";
import { ConnectionAI } from "../../ai/infrastructure/serviceOfAI";
import { GetCreateYourHistoryGame } from "../../ai/applications/games/getCreateYourHistoryGame";
import { CreateEmbedding } from "../../ai/applications/embeddings/createEmbedding";
import { FindProgresByID } from "../../userPogressBooks/aplication/service/FindById.Service";
import { FindProgressMongo } from "../../userPogressBooks/infrastructure/bookProgressRepoMongo";
import { CreateBookContent } from "../../bookContent/application/createBookContent";
import { mongoRepositoryBookContent } from "../../bookContent/infrastructure/moongoRepositoryBookContent";
import { GetAllVectorStoresMemoryByIdUser } from "../../ai/applications/vectorStoreMemory.ts/getAllVectorStoreMemoryByIdSession";

const recommendationsRepository = new MongoRecommendationRepository();
const aiService = new ConnectionAI();
const progressRepository = new FindProgressMongo();
const bookContentRepository = new mongoRepositoryBookContent();

export const serviceContainer = {
  recommendations: {
    getRecommendations: new GetRecommendations(recommendationsRepository),
    getRecommendatioSemantic: new GetRecommendatioSemantic(recommendationsRepository),
  },

  ai: {
    getIdsForRecommendation: new GetIdsForRecommendation(aiService),
    getCreateYourHistoryGame: new GetCreateYourHistoryGame(aiService),
    createEmbedding: new CreateEmbedding(aiService),
    getAllVectorStoresMemoryByIdSession: new GetAllVectorStoresMemoryByIdUser(aiService),
    getAllVectorStoresMemoryByIdUser: new GetAllVectorStoresMemoryByIdUser(aiService),
  },
  progress: {
    findProgres: new FindProgresByID(progressRepository),
  },
  bookContent: {
    createBookContent: new CreateBookContent(bookContentRepository),
  },
};

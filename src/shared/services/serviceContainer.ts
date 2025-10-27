import { GetRecommendations } from "../../recommendations/applications/getRecommendations";
import { MongoRecommendationRepository } from "../../recommendations/infrastructures/mongoRecommendationRepository";
import { GetRecommendatioSemantic } from "../../recommendations/applications/getRecommendatioSemantic";
import { FindProgresByID } from "../../userPogressBooks/aplication/service/FindById.Service";
import { FindProgressMongo } from "../../userPogressBooks/infrastructure/bookProgressRepoMongo";
import { CreateBookContent } from "../../bookContent/application/createBookContent";
import { mongoRepositoryBookContent } from "../../bookContent/infrastructure/moongoRepositoryBookContent";

const recommendationsRepository = new MongoRecommendationRepository();
const progressRepository = new FindProgressMongo();
const bookContentRepository = new mongoRepositoryBookContent();

export const serviceContainer = {
  recommendations: {
    getRecommendations: new GetRecommendations(recommendationsRepository),
    getRecommendatioSemantic: new GetRecommendatioSemantic(recommendationsRepository),
  },

  progress: {
    findProgres: new FindProgresByID(progressRepository),
  },
  bookContent: {
    createBookContent: new CreateBookContent(bookContentRepository),
  },
};

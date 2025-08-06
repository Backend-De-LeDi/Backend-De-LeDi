import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";

export interface RecommendationsRepository {
  getBasicRecommendations: (themes: string[], format: string[]) => Promise<SearchedBook[]>;
  getAdvancedRecommendations: (id: Types.ObjectId) => Promise<SearchedBook[]>;
}

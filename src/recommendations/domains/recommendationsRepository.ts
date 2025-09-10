import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";

export interface RecommendationsRepository {
  getRecommendations(userId: Types.ObjectId): Promise<SearchedBook[]>;
}

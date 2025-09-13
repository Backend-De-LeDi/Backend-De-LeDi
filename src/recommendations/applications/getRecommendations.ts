import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../../recommendations/domains/recommendationsRepository";

export class GetRecommendations {
  constructor(private recommendationsRepository: RecommendationsRepository) { }
  async run(userId: Types.ObjectId): Promise<SearchedBook[]> {
    return this.recommendationsRepository.getRecommendations(userId);
  }
}

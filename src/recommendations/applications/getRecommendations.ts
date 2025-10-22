import { Types } from "mongoose";
import { BookSearch } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../../recommendations/domains/recommendationsRepository";

export class GetRecommendations {
  constructor(private recommendationsRepository: RecommendationsRepository) { }
  async run(userId: Types.ObjectId): Promise<BookSearch[]> {
    return this.recommendationsRepository.getRecommendations(userId);
  }
}

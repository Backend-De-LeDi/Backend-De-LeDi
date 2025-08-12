import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../domain/recommendationsRepository";

export class GetAdvancedRecommendations {
  constructor(private repository: RecommendationsRepository) {}
  async run(id: Types.ObjectId[], ids: Types.ObjectId[]): Promise<SearchedBook[]> {
    return await this.repository.getAdvancedRecommendations(id, ids);
  }
}

import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../domain/recommendationsRepository";

export class GetRecommendations {
  constructor(private repository: RecommendationsRepository) {}

  async run(id: string[]): Promise<SearchedBook[]> {
    return this.repository.recommendation(id);
  }
}

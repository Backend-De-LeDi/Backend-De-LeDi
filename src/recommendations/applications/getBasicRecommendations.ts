import { string } from "zod";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../domain/recommendationsRepository";

export class GetBasicRecommendations {
  constructor(private repository: RecommendationsRepository) {}

  async run(themes: string[], format: string[]): Promise<SearchedBook[]> {
    return this.repository.getBasicRecommendations(themes, format);
  }
}

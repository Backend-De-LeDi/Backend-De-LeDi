import { RecommendationRepository } from "../../domain";

export class GetIdsForRecommendation {
  constructor(private repository: RecommendationRepository) {}

  async run(idsBooks: string[]): Promise<string[]> {
    return await this.repository.getIdsForRecommendation(idsBooks);
  }
}

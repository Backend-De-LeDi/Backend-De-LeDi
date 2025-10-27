import { RecommendationRepository } from "../../domain";

export class RecommendationApps {
     constructor(private repository: RecommendationRepository) { }

     async getIdsForRecommendation(idsBooks: string[]): Promise<string[]> {
          return await this.repository.getIdsForRecommendation(idsBooks);
     }
}
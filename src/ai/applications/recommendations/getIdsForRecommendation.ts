import { AIRepository } from "../../domain/services/AIRepository";

export class GetIdsForRecommendation {
     constructor(private repository: AIRepository) { }

     async run(idsBooks: string[]): Promise<string[]> {
          return await this.repository.getIdsForRecommendation(idsBooks)
     }
}
import { ConnectionAIRepository } from "../../domains/connectionAIRepository";

export class GetIdsForRecommendation {
     constructor(private repository: ConnectionAIRepository) { }

     async run(idsBooks: string[]): Promise<string[]> {
          return await this.repository.getIdsForRecommendation(idsBooks)
     }
}
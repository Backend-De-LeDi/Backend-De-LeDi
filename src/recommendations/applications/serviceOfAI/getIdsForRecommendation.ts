import { Types } from "mongoose";
import { ConnectionAIRepository } from "../../domains/connectionAIRepository";

export class GetIdsForRecommendation {
     constructor(private repository: ConnectionAIRepository) { }

     async run(idsBooks: Types.ObjectId[]): Promise<Types.ObjectId[]> {
          return await this.repository.getIdsForRecommendation(idsBooks)
     }
}
import { Types } from "mongoose";
import { RecommendationsRepository } from "../../domains/recommendationsRepository";
import { SearchedBook } from "../../../shared/types/bookTypes/bookTypes";

export class GetRecommendatioSemantic {
     constructor(private repository: RecommendationsRepository) { }

     async run(userId: Types.ObjectId): Promise<SearchedBook[]> {
          return await this.repository.getRecommendatioSemantic(userId)
     }
}
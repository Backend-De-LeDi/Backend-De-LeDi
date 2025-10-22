import { Types } from "mongoose";
import { RecommendationsRepository } from "../domains/recommendationsRepository";
import { BookSearch } from "../../shared/types/bookTypes/bookTypes";

export class GetRecommendatioSemantic {
     constructor(private repository: RecommendationsRepository) { }

     async run(userId: Types.ObjectId): Promise<BookSearch[]> {
          return await this.repository.getRecommendatioSemantic(userId)
     }
}
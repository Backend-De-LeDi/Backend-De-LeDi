import { Types } from "mongoose"
export interface ConnectionAIRepository {
     getIdsForRecommendation(idsBooks: Types.ObjectId[]): Promise<Types.ObjectId[]>
}
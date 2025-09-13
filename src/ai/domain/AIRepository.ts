import { Types } from "mongoose"

export interface AIRepository {
     getIdsForRecommendation(idsBooks: string[]): Promise<string[]>
     createYourHistoryGame(idBook: string): Promise<any>

}
import { Types } from "mongoose"

export interface AIRepository {
     getIdsForRecommendation(idsBooks: string[]): Promise<string[]>
     createYourHistoryGame(idBook: string): Promise<any>
     createEmbedding(id: string, title: string, summary: string, synopsis: string): Promise<{ msg: string, status: boolean }>
}
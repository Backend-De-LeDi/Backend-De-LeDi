import { Types } from "mongoose";

export interface AIRepository {
  getIdsForRecommendation(idsBooks: string[]): Promise<string[]>;
  createYourHistoryGame(idBook: string): Promise<any>;
  createEmbedding(id: Types.ObjectId, title: string, summary: string, synopsis: string): Promise<void>;
}

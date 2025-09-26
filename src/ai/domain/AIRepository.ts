import { Types } from "mongoose";
import { Gamble } from "../../shared/types/createYourHistory/createYourHistory";

export interface AIRepository {
  getIdsForRecommendation(idsBooks: string[]): Promise<string[]>;
  createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any>;
  createEmbedding(id: Types.ObjectId, title: string, summary: string, synopsis: string): Promise<void>;
}

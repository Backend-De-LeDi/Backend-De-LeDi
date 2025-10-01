import { Types } from "mongoose";
import { Gamble } from "../../../shared/types/createYourHistory/createYourHistory";
import { VectorStoreMemory } from "../entities/vectorStoreMemory";

export interface AIRepository {
  getIdsForRecommendation(idsBooks: string[]): Promise<string[]>;
  createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any>;
  createEmbedding(id: Types.ObjectId, title: string, summary: string, synopsis: string): Promise<void>;
  createVectorStoreMemory(data: VectorStoreMemory): Promise<any>;
  getAllVectorStoresMemoryByIdUser(idUser: Types.ObjectId): Promise<VectorStoreMemory[]>;
  getAllVectorStoreMemoryByIdSession(idSeccion: string): Promise<VectorStoreMemory[]>,
  chatBot(message: string): Promise<string>
}

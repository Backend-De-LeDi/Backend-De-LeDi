import { Types } from "mongoose";
import { Gamble, Quiz } from "../../../shared/types/gamesTypes/createYourHistory";
import { SessionRecord } from "../entities/SessionRecord";

export interface AIRepository {
  getIdsForRecommendation(idsBooks: string[]): Promise<string[]>;
  createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any>;
  createEmbedding(id: Types.ObjectId, title: string, summary: string, synopsis: string): Promise<void>;
  quiz(idBook: string, quiz: Quiz | undefined): Promise<any>;
  getAllVectorStoresMemoryByIdUser(idUser: Types.ObjectId): Promise<SessionRecord[]>;
  getAllVectorStoreMemoryByIdSession(idSeccion: string): Promise<SessionRecord[]>;
  insertBookToDocuments(idBoook: Types.ObjectId): Promise<void>
  deleteBookFromDocuments(idBook: string): Promise<void>
  insertAuthorToDocuments(authorId: Types.ObjectId): Promise<void>
  deleteAuthorFromDocuments(idBook: string): Promise<void>
}

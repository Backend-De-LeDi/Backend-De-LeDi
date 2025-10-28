import { Types } from "mongoose";
import { SessionRecord } from "../entities/SessionRecord";
import { Memory } from "../../../shared/types/memoryTypes/memory";

export interface MemoryRepository {
  getAllVectorStoresMemoryByIdUser(idUser: string): Promise<Memory[]>;
  getAllVectorStoreMemoryByIdSession(idSession: string, idUser: string): Promise<Memory[]>;
}

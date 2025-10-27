import { Types } from "mongoose";
import { SessionRecord } from "../entities/SessionRecord";

export interface MemoryRepository {
     getAllVectorStoresMemoryByIdUser(idUser: Types.ObjectId): Promise<SessionRecord[]>;
     getAllVectorStoreMemoryByIdSession(idSeccion: string): Promise<SessionRecord[]>;
}
import { MemoryRepository } from "../../domain";
import { Types } from "mongoose";
import { SessionRecord } from "../../domain";

export class MemoryApps {
     constructor(private repository: MemoryRepository) { }

     async getByUser(idUser: Types.ObjectId): Promise<SessionRecord[]> {
          return await this.repository.getAllVectorStoresMemoryByIdUser(idUser);
     }

     async getBySession(idSeccion: string): Promise<SessionRecord[]> {
          return await this.repository.getAllVectorStoreMemoryByIdSession(idSeccion);
     }
}
import { MemoryRepository } from "../../domain";
import { SessionRecord } from "../../domain";
import { Memory } from "../../../shared/types/memoryTypes/memory";

export class MemoryApps {
  constructor(private repository: MemoryRepository) {}

  async getByUser(idUser: string): Promise<Memory[]> {
    return await this.repository.getAllVectorStoresMemoryByIdUser(idUser);
  }

  async getBySession(idSession: string, idUser: string): Promise<Memory[]> {
    return await this.repository.getAllVectorStoreMemoryByIdSession(idSession, idUser);
  }
}

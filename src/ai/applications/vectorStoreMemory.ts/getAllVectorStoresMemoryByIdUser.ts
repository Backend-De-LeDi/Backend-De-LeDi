import { AIRepository } from "../../domain/services/AIRepository";

export class GetAllVectorStoresMemoryByIdSession {
     constructor(private repository: AIRepository) { }
     async run(idSeccion: string) {
          return await this.repository.getAllVectorStoreMemoryByIdSession(idSeccion)
     }
}
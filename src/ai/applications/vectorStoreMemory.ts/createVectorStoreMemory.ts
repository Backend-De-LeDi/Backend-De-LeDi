import { AIRepository } from "../../domain/services/AIRepository";
import { VectorStoreMemory } from "../../domain/entities/vectorStoreMemory";

export class CreateVectorStoreMemory {

     constructor(private repository: AIRepository) { }

     async run(data: VectorStoreMemory): Promise<void> {
          return await this.repository.createVectorStoreMemory(data)
     }
}
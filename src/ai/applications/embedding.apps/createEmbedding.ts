import { EmbeddingRepository } from "../../domain";

export class EmbeddingApps {
     constructor(private repository: EmbeddingRepository) { };

     async create384(text: string): Promise<number[]> {
          return await this.repository.createEmbedding384(text)
     }

     async create768(text: string): Promise<number[]> {
          return await this.repository.createEmbedding768(text)
     }
}
import { AIRepository } from "../domain/AIRepository";

export class CreateEmbedding {

     constructor(private repository: AIRepository) { }

     async run(id: string, title: string, summary: string, synopsis: string): Promise<{ msg: string, status: boolean }> {
          return await this.repository.createEmbedding(id, title, summary, synopsis)
     }

}
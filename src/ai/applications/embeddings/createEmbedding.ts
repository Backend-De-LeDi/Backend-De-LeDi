import { Types } from "mongoose";
import { AIRepository } from "../../domain/services/AIRepository";
export class CreateEmbedding {
  constructor(private repository: AIRepository) { }

  async run(id: Types.ObjectId, title: string, summary: string, synopsis: string): Promise<void> {
    await this.repository.createEmbedding(id, title, summary, synopsis);
  }
}

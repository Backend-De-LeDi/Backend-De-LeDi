import { BookContentRepository } from "../domain/bookContentRepository";
import { Types } from "mongoose";

export class CreateBookContent {
  constructor(private repository: BookContentRepository) {}

  async run(id: Types.ObjectId, title: string, text: { page: number; content: string }[]): Promise<void> {
    await this.repository.createBookContent(id, title, text);
  }
}

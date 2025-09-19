import { Types } from "mongoose";
import { BookContent } from "../domain/bookContent";
import { BookContentRepository } from "../domain/bookContentRepository";
import { BookContentModel } from "./model/BookContentModel";

export class mongoRepositoryBookContent implements BookContentRepository {
  async createBookContent(id: Types.ObjectId, title: string, text: { page: number; content: string }[]): Promise<void> {
    const newContent = new BookContent(id, title, text);
    const newContentBook = await BookContentModel.create(newContent);
    newContentBook.save();
  }
}

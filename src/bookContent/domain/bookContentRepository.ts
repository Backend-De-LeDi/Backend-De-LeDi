import { Types } from "mongoose";
export interface BookContentRepository {
  createBookContent(id: Types.ObjectId, title: string, text: { page: number; content: string }[]): Promise<void>;
}

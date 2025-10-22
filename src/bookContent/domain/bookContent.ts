import { Types } from "mongoose";
export class BookContent {
  constructor(public bookId: Types.ObjectId, public title: string, public text: { page: number; content: string }[]) {}
}

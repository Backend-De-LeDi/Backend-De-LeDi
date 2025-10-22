// models/BookContentModel.ts
import { Schema, model, Types } from "mongoose";

const PageContentSchema = new Schema(
  {
    page: { type: Number, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const BookContentSchema = new Schema(
  {
    bookId: { type: Types.ObjectId, ref: "Book", required: true, index: true },
    title: { type: String, required: true },
    text: { type: [PageContentSchema], required: true },
  },
  { versionKey: false, timestamps: true }
);

export const BookContentModel = model("BookContent", BookContentSchema);

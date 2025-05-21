import { IBook } from "../../../types/bookTypes";
import { Schema, model } from "mongoose";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  author: { type: String },
  descriptions: { type: String, required: true },
  category: [{ type: String, required: true }],
  language: { type: String, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  content: { type: Schema.Types.ObjectId, ref: "ContentBooks", required: true },
  pathInternal: { type: String, require: true },
  coverImage: {
    type: {
      id_image: { type: String, required: true },
      url_secura: { type: String, required: true },
    },
  },
});

const BookModel = model<IBook>("Book", bookSchema);

export { BookModel };

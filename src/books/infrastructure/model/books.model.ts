import { IBook } from "../../../shared/types/bookTypes/bookTypes";
import { Schema, model } from "mongoose";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: [{ type: Schema.Types.ObjectId, ref: "AuthorModel" }],
    summary: { type: String, required: true },
    subgenre: [{ type: String, required: true }],
    language: { type: String, required: true },
    available: { type: Boolean, default: true },
    yearBook: { type: String, default: new Date().getFullYear().toString() },
    synopsis: { type: String, required: true },
    contentBook: {
      type: {
        idContentBook: { type: String, required: true },
        url_secura: { type: String, required: true },
      },
    },
    bookCoverImage: {
      type: {
        idBookCoverImage: { type: String, required: true },
        url_secura: { type: String, required: true },
      },
    },
    theme: [{ type: String, require: true }],
    genre: { type: String, required: true },
    level: { type: String, required: true },
    format: { type: String, require: true },
    fileExtension: { type: String, require: true },
    totalPages: { type: Number },
    duration: { type: Number },
  },
  { timestamps: true }
);

const BookModel = model<IBook>("Books", bookSchema);
export { BookModel };

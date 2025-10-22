import { BookDetail } from "../../../shared/types/bookTypes/bookTypes";
import { Schema, model } from "mongoose";

const bookSchema = new Schema<BookDetail>(
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

bookSchema.index(
  {
    title: "text",
    summary: "text",
    synopsis: "text",
    theme: "text",
    genre: "text",
    subgenre: "text"
  },
  {
    default_language: "spanish",
    name: "BookTextIndex",
    weights: {
      title: 5,
      summary: 3,
      synopsis: 2,
      theme: 2,
      genre: 1,
      subgenre: 1
    }
  }
);

const BookModel = model<BookDetail>("Books", bookSchema);
export { BookModel };

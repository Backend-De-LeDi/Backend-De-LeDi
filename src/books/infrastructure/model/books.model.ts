import { IBook } from "../../../types/bookTypes";
import { Schema, model } from "mongoose";

// definimos el modelo de estructura para almacenar los datos
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: [{ type: Schema.Types.ObjectId, ref: "authors" }],
    descriptions: { type: String, required: true },
    subgenre: [{ type: String, required: true }],
    language: { type: String, required: true },
    available: { type: Boolean, default: true },
    yearBook: { type: Date, default: Date.now },
    content: {
      type: {
        idContentBook: { type: String, required: true },
        url_secura: { type: String, required: true },
      },
    },
    coverImage: {
      type: {
        idCoverImage: { type: String, required: true },
        url_secura: { type: String, required: true },
      },
    },
    genreType: { type: String, require: true },
  },
  { timestamps: true }
);

const BookModel = model<IBook>("Books", bookSchema);

export { BookModel };

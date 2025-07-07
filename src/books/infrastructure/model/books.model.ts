import { IBook } from "../../../types/bookTypes";
import { Schema, model } from "mongoose";

// ? definimos el modelo de estructura para almacenar los datos
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: [{ type: Schema.Types.ObjectId, ref: "AuthorModel" }],
    summary: { type: String, required: true },
    subgenre: [{ type: String, required: true }],
    language: { type: String, required: true },
    available: { type: Boolean, default: true },
    yearBook: { type: Date, default: Date.now },
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
  },
  { timestamps: true }
);

// ? exportamos el modelo de libro para poder usarlo en otras partes de la aplicación
const BookModel = model<IBook>("Books", bookSchema);
export { BookModel };

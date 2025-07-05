import { Schema, model } from "mongoose";
import { IBook } from "../../../types/bookTypes";

// * esquema de estructura de como se va almacenar los audio libros en la base de dato

const audioBookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: [{ type: Schema.Types.ObjectId, ref: "authors" }],
    summary: { type: String, required: true },
    subgenre: [{ type: String, require: true }],
    language: { type: String, required: true },
    available: { type: Boolean, default: true },
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
    synopsis: { type: String, required: true },
    yearBook: { type: Date, default: Date.now },
    theme: [{ type: String, required: true }],
    genre: { type: String, required: true },
    level: { type: String, required: true },
  },
  { timestamps: true } // * campo que almacena el tiempo de carga en la base de datos y cuando se actualiza en la bases de datos
);

// * modelo que se utiliza en el mongoAudiobooksRepository
const AudioBookModel = model<IBook>("AudioBooks", audioBookSchema);

export { AudioBookModel };

import mongoose, { Schema } from "mongoose";
import { Author } from "../../domain/entidades/author.Types";

const AuthorSchenma = new Schema<Author>({
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  avatar: {
    id_image: { type: String, required: true },
    url_secura: { type: String, required: true },
  },
});

export const AuthorModel = mongoose.model<Author>("AuthorModel", AuthorSchenma);

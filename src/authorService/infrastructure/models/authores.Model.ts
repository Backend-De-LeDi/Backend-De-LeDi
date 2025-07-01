import mongoose, { Schema } from "mongoose";
import { Author } from "../../domain/entidades/author.Types";

const AuthorSchenma = new Schema<Author>({
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    avatar: {
        type: String,

    }
})

export const AuthorModel = mongoose.model<Author>('AuthorModel', AuthorSchenma)
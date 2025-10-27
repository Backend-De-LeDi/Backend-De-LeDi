import mongoose, { Schema } from "mongoose";
import { Itoken } from "../types/Token.type";


const TokenSchema = new Schema<Itoken>({
    token: {
        type: String,
        required: true
    }
})


export const TokenModel = mongoose.model<Itoken>("Token", TokenSchema)
import mongoose, { Schema } from "mongoose";
import { Foro } from "../../domain/entities/foros.types";



const ForoSchema = new Schema<Foro>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export const ForosModel = mongoose.model<Foro>("Foros", ForoSchema)
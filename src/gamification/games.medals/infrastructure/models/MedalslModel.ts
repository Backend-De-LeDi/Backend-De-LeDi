import mongoose from "mongoose";
import { Schema } from "mongoose";
import { MedalsTypes } from "../../domain/entities/MedalsTypes";

const MedalSchema = new Schema<MedalsTypes>({
    name: {
        type: String,
        required: true
    },
    medals_posicion: {
        type: Number,
        required: true
    },
    img: {
        url_secura: { type: String, required: true },
        id_image: { type: String, required: true }
    }
});

export const MedalsModel = mongoose.model<MedalsTypes>("Medals", MedalSchema);

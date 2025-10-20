import mongoose from "mongoose";
import { Schema } from "mongoose";
import { LevesTypes } from "../../domain/entities/LevesTypes";

const LevelSchema = new Schema<LevesTypes>({
    level: {
        type: String,
        required: true
    },
    img: {
        url_secura: { type: String, required: true },
        id_image: { type: String, required: true }
    },

});

export const LevelModel = mongoose.model<LevesTypes>("Leves", LevelSchema);

import mongoose from "mongoose";
import { Schema } from "mongoose";
import { LevelsTypes } from "../../domain/entities/LevesTypes";

const LevelSchema = new Schema<LevelsTypes>({
    level: {
        type: Number,
        required: true
    },
    maxPoint: {
        type: Number,
        required: true
    },
    img: {
        url_secura: { type: String, required: true },
        id_image: { type: String, required: true }
    }, level_string: {
        type: String,
        required: true
    }

});

export const LevelModel = mongoose.model<LevelsTypes>("Levels", LevelSchema);

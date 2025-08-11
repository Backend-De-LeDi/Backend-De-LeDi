import mongoose, { Schema } from "mongoose";
import { ComentTypes } from "../../domain/entities/coments.types";

const ComentarioSchema: Schema = new Schema<ComentTypes>(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        idComent: {
            type: Schema.Types.ObjectId,
            ref: "Coments",
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

export default mongoose.model<ComentTypes>("Coments", ComentarioSchema);
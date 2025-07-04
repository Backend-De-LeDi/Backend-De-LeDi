import mongoose from "mongoose";
import { Schema } from "mongoose";
import { AvatarType } from "../../domain/entities/AvatarsTypes";

const AvatarSchema = new Schema<AvatarType>({
    avatars: {
        type: String,
        required: true

    },
    gender: {
        type: String,
        required: true
    }
})
export const AvatarModel = mongoose.model<AvatarType>("Avatars", AvatarSchema)

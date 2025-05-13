import mongoose from "mongoose";
import { AuthUser } from "../types/auth-types";
import { Schema } from "mongoose";

const authSchema = new Schema<AuthUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

})
export const authModel = mongoose.model<AuthUser>("User", authSchema)
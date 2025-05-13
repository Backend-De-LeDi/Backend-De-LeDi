import mongoose from "mongoose";
import { User } from "../../../domain/entities/UserTypes";
import { Schema } from "mongoose";

const UserSchema = new Schema<User>({
    // name: {
    //     type: String,
    //     required: true
    // },
    // lastName: {
    //     type: String,
    //     required: true
    // },
    // userName: {
    //     type: String,
    //     required: true
    // },
    // birthDate: {
    //     type: Date,

    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // avatar: {
    //     type: String,

    // }, preference: {
    //     type: new Schema(
    //         {
    //             category: {
    //                 type: [String],
    //                 required: true,
    //             },
    //             language: {
    //                 type: String,
    //                 required: true,
    //             },

    //         },
    //     ),
    //     required: true,
    // },
})
export const UserModel = mongoose.model<User>("User", UserSchema)
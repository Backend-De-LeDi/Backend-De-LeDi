import mongoose from "mongoose";
import { User } from "../../domain/entities/UserTypes";
import { Schema } from "mongoose";
import { string } from "zod";

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nivel: {
    type: String,
    required: true,
  },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Avatars",
  },
  preference: {
    type: new Schema({
      category: {
        type: [String],
      },
      format: {
        type: [String],
      },
    }),
  },
});
export const UserModel = mongoose.model<User>("Users", UserSchema);

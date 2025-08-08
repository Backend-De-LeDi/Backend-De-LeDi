import mongoose from "mongoose";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { Schema } from "mongoose";

const BookProgresSchema = new Schema<BookUserProgresRepo>({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  idBook: {
    type: Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
  status: {
    type: String,
    enum: ["reading", "finished", "abandoned", "unmarked"],
    required: true,
  },
  progress: {
    type: Number,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
});

export const BookProgressModel = mongoose.model<BookUserProgresRepo>("BookProgress", BookProgresSchema);

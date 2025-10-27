import { Schema, model } from "mongoose";

const optionSchema = new Schema(
  {
    textOption: {
      type: String,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // subdocumento sin _id propio
);

const tempHistoryGame = new Schema({
  idBook: {
    type: Schema.ObjectId,
    ref: "Books",
  },
  idUser: {
    type: Schema.ObjectId,
    ref: "Users",
  },
  title: {
    type: String,
    required: [true, "titulo del juego"],
  },
  scenery: {
    type: String,
    required: [true, "El escenario debe tener contenido narrativo"],
  },
  options: {
    type: [optionSchema],
  },
  chosenOptions: {
    type: [optionSchema],
    default: [],
  },
  total: {
    type: Number,
    required: true,
  },
});

export const TempHistoryGame = model("tempHistoryGame", tempHistoryGame);

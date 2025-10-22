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

const temp = new Schema({
  idBook: {
    type: Schema.ObjectId,
    ref: "Books",
  },
  idUser: {
    type: Schema.ObjectId,
    ref: "Books",
  },
  title: {
    type: String,
    required: [true, "titulo del juego"],
  },
  ecenary: {
    type: String,
    required: [true, "El escenario debe tener contenido narrativo"],
  },
  page: {
    type: Number,
    required: true,
  },
  options: {
    type: [optionSchema],
  },
  total: {
    type: Number,
    required: true,
  },
  selectOption: {
    type: [optionSchema],
  },
});

export const TempData = model("temp", temp);

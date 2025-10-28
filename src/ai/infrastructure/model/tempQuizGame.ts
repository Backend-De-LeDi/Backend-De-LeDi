import { Schema, model } from "mongoose";

const quizOptionSchema = new Schema(
     {
          textOption: {
               type: String,
               required: true,
          },
          status: {
               type: Boolean,
               required: true,
          },
          score: {
               type: Number,
               required: true,
          },
     },
     { _id: false } // subdocumento sin _id propio
);

const chosenQuizSchema = new Schema(
     {
          textOption: {
               type: String,
               required: true,
          },
          score: {
               type: Number,
               required: true,
          },
     },
     { _id: false }
);

const tempQuizGameSchema = new Schema({
     idBook: {
          type: Schema.ObjectId,
          ref: "Books",
          required: true,
     },
     idUser: {
          type: Schema.ObjectId,
          ref: "Users",
          required: true,
     },
     title: {
          type: String,
          required: true,
     },
     scenery: {
          type: String,
          required: true,
     },
     page: {
          type: Number,
          required: true,
     },
     options: {
          type: [quizOptionSchema],
          default: [],
     },
     chosenOptions: {
          type: [chosenQuizSchema],
          default: [],
     },
     total: {
          type: Number,
          required: true,
          default: 0,
     },
     completed: {
          type: Boolean,
          required: true,
          default: false,
     },
     textCompleted: {
          type: String,
          default: "",
     },
});

export const TempQuizGame = model("temp_Quiz_Game", tempQuizGameSchema);
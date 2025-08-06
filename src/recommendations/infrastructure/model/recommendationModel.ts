import mongoose from "mongoose";
import { IRecommendationsType } from "../../../shared/types/recommendationsTypes/recommendationType";

const Recommendation = new mongoose.Schema<IRecommendationsType>(
  {
    idBook: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const RecommendationModel = mongoose.model<IRecommendationsType>("Recommendation", Recommendation);

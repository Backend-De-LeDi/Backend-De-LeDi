import { Schema } from "mongoose";
export interface IRecommendationsType {
  idBook: Schema.Types.ObjectId[];
  idUser: Schema.Types.ObjectId;
}

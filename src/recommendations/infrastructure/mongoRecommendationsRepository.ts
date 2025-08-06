import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../domain/recommendationsRepository";
import { BookModel } from "../../books/infrastructure/model/books.model";
import mongoose from "mongoose";
import { format } from "morgan";
import { BookProgressModel } from "../../userPogressBooks/infrastructure/models/BookProgressModel";

export class MongoRecommendationsRepository implements RecommendationsRepository {
  async getBasicRecommendations(themes: string[], format: string[]): Promise<SearchedBook[]> {
    const recommendations = await BookModel.aggregate([
      {
        $addFields: {
          themeMatches: { $setIntersection: ["$theme", themes] },
          formatMatch: { $cond: [{ $in: ["$format", format] }, 1, 0] },
        },
      },
      {
        $addFields: {
          matchScore: {
            $add: [{ $size: "$themeMatches" }, "$formatMatch"],
          },
        },
      },
      { $match: { matchScore: { $gt: 0 } } },
      { $sort: { matchScore: -1 } },
    ]);
    return recommendations;
  }

  async getAdvancedRecommendations(id: mongoose.Types.ObjectId): Promise<SearchedBook[]> {
    const recommendations = await BookProgressModel.find({ idUser: id }).populate("idBook");
    console.log(recommendations);
    return recommendations as any;
  }
}

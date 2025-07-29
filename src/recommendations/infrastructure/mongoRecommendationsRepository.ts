import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../domain/recommendationsRepository";
import { BookModel } from "../../books/infrastructure/model/books.model";
import mongoose from "mongoose";

export class MongoRecommendationsRepository implements RecommendationsRepository {
  async recommendation(id: string[]): Promise<SearchedBook[]> {
    const ids = id.map((x) => new mongoose.Types.ObjectId(x));
    const recommendedBooks = await BookModel.find({ _id: { $in: ids } });
    return recommendedBooks;
  }
}

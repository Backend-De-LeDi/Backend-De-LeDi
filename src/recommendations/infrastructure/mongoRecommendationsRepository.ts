import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../domain/recommendationsRepository";
import { BookModel } from "../../books/infrastructure/model/books.model";
import { Types } from "mongoose";
import { PipelineStage } from "mongoose";
import mongoose from "mongoose";

// ? repositorio que permite la comunicación con la base de datos MongoDB para obtener recomendaciones de libros
export class MongoRecommendationsRepository implements RecommendationsRepository {
  // ? obtiene recomendaciones básicas de libros basadas en temas y formatos ✅
  async getBasicRecommendations(themes: string[], format: string[]): Promise<SearchedBook[]> {
    const pipeline: PipelineStage[] = [];

    pipeline.push({
      $addFields: {
        themeMatches: themes.length > 0 ? { $setIntersection: ["$theme", themes] } : [],
        formatMatch: format.length > 0 ? { $cond: [{ $in: ["$format", format] }, 1, 0] } : 0,
      },
    });

    pipeline.push({
      $addFields: {
        matchScore: {
          $add: [themes.length > 0 ? { $size: "$themeMatches" } : 0, format.length > 0 ? "$formatMatch" : 0],
        },
      },
    });

    pipeline.push({ $match: { matchScore: { $gte: 0 } } });

    pipeline.push({ $sort: { matchScore: -1 as 1 | -1 } }); // 👈 esto es clave

    const recommendations = await BookModel.aggregate(pipeline);

    return recommendations;
  }

  // ? obtiene recomendaciones avanzadas de libros excluyendo ciertos IDs y basándose en una lista de todos los IDs proporcionados ✅
  async getAdvancedRecommendations(idToExclude: Types.ObjectId[], AllIds: Types.ObjectId[]): Promise<SearchedBook[]> {
    const filteredIds = AllIds.filter((id) => !idToExclude.some((excluded) => excluded.equals(id)));

    const recommendations = await BookModel.find({ _id: { $in: filteredIds } });

    return recommendations;
  }
}

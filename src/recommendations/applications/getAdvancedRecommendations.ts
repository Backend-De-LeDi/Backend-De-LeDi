import { Types } from "mongoose";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../domain/recommendationsRepository";

// ? caso de uso que maneja la lógica para obtener recomendaciones avanzadas de libros
export class GetAdvancedRecommendations {
  constructor(private repository: RecommendationsRepository) {}
  async run(id: Types.ObjectId[], ids: Types.ObjectId[]): Promise<SearchedBook[]> {
    return await this.repository.getAdvancedRecommendations(id, ids);
  }
}

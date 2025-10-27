import { RecommendationRepository } from "../domain";
import { EmbeddingModel } from "./model/embeddingModel";
import { UtilsAi } from "../../shared/utils/IA/utilsAi";

export class RecommendationDriver implements RecommendationRepository {
  async getIdsForRecommendation(userBookIds: string[]): Promise<string[]> {
    const filtered = await EmbeddingModel.find({ bookId: { $in: userBookIds } });

    if (filtered.length === 0) return [];

    const targetEmbedding = filtered[0].embedding;

    const allEmbeddings = await EmbeddingModel.find({});

    const scored = allEmbeddings
      .filter((doc) => !userBookIds.includes(doc.bookId.toString()))
      .map((doc) => ({
        id: doc.bookId.toString(),
        score: UtilsAi.cosineSimilarity(targetEmbedding, doc.embedding),
      }))
      .sort((a, b) => b.score - a.score);

    return scored.map((s) => s.id);
  }
}

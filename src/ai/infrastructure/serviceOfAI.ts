import { AIRepository } from "../domain/AIRepository";
import { generateEmbedding } from "../../shared/utils/loadModel";
import { EmbeddingModel } from "./model/embeddingModel";
import { Types } from "mongoose";
import { cosineSimilarity } from "../../shared/utils/simility";

export class ConnectionAI implements AIRepository {
  async getIdsForRecommendation(userBookIds: string[]): Promise<string[]> {
    const filtered = await EmbeddingModel.find({ bookId: { $in: userBookIds } });

    if (filtered.length === 0) return [];

    const targetEmbedding = filtered[0].embedding;

    const allEmbeddings = await EmbeddingModel.find({});

    const scored = allEmbeddings
      .filter((doc) => !userBookIds.includes(doc.bookId.toString()))
      .map((doc) => ({
        id: doc.bookId.toString(),
        score: cosineSimilarity(targetEmbedding, doc.embedding),
      }))
      .sort((a, b) => b.score - a.score);

    return scored.map((s) => s.id);
  }

  async createYourHistoryGame(idBook: string): Promise<any> {
    try {
      const req = await fetch(`http://127.0.0.1:4590/game/createYourHistory/${idBook}`);
      const res = await req.json();
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createEmbedding(id: Types.ObjectId, title: string, summary: string, synopsis: string): Promise<void> {
    try {
      const text = `${title}. ${summary} ${synopsis}`;
      const vector = await generateEmbedding(text);
      await EmbeddingModel.create({ bookId: id, embedding: vector });
    } catch (err) {
      console.error("Error al crear el embedding:", err);
    }
  }
}

import { AIRepository } from "../domain/AIRepository";
import { generateEmbedding } from "../../shared/utils/loadModel";
import { EmbeddingModel } from "./model/embeddingModel";
import { Types } from "mongoose";
import { cosineSimilarity } from "../../shared/utils/simility";
import { zodResponseFormat } from "openai/helpers/zod"
import { openai } from "../domain/model";
import { createYourHistoModel, final } from "./model/createYourHistoModel";
import { BookContentModel } from "../../bookContent/infrastructure/model/BookContentModel";
import { ContentBookLiteral, Gamble } from "../../shared/types/createYourHistory/createYourHistory";
import { PromptFactory } from "../../shared/config/const/prompt";
import { PromptSystem } from "../../shared/class/promptSystem";
import { separator } from "../../shared/utils/consoleSeparator";

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

  async createEmbedding(id: Types.ObjectId, title: string, summary: string, synopsis: string): Promise<void> {
    try {
      const text = `${title}. ${summary} ${synopsis}`;
      const vector = await generateEmbedding(text);
      await EmbeddingModel.create({ bookId: id, embedding: vector });
    } catch (err) {
      console.error("Error al crear el embedding:", err);
    }
  }

  async createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any | void> {
    try {
      const idValid = new Types.ObjectId(idBook)
      const [contentBook] = await BookContentModel.find({ bookId: idValid }, { title: 1, text: 1, _id: 0 })

      const contentBookLiteral: ContentBookLiteral = {
        title: contentBook.title,
        text: contentBook.text.map(entry => entry.content),
      };
      const isInitial = gamble === undefined;
      const page = isInitial ? 0 : gamble.page;
      const outOfBounds = page >= contentBook.text.length;

      const promptUser = PromptFactory.create(gamble, contentBookLiteral);
      const promptSystem = PromptSystem.getIntancia()

      const completion = await openai.chat.completions.parse({
        model: "gemini-2.5-flash-lite",
        temperature: 0.7,
        messages: [{ role: "system", content: promptSystem.prompt }, { role: "user", content: promptUser }
        ],
        response_format: zodResponseFormat(outOfBounds ? final : createYourHistoModel, "event")
      })

      const event = completion.choices[0].message.parsed;
      return event
    } catch (error) {
      separator();
      console.log(error);
      separator();
    }
  }

  async chatBot(idUser: Types.ObjectId, message: string, idSession: string) {

  }
}

import { AIRepository } from "../domain/AIRepository";
import { generateEmbedding } from "../../shared/utils/loadModel";
import { EmbeddingModel } from "./model/embeddingModel";
import { Types } from "mongoose";
import { cosineSimilarity } from "../../shared/utils/simility";
import { zodResponseFormat } from "openai/helpers/zod"
import { openai } from "../domain/model";
import { createYourHistoModel } from "./model/createYourHistoModel";
import { BookContentModel } from "../../bookContent/infrastructure/model/BookContentModel";
import { parseStringFinal } from "../../shared/utils/parseString";

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

  async createYourHistoryGame(idBook: string, page: number = 0): Promise<any> {
    try {
      const idValid = new Types.ObjectId(idBook)
      const [contentBook] = await BookContentModel.find({ bookId: idValid }, { title: 1, text: 1, _id: 0 })

      const content = contentBook.text[page]
      console.log(content)

      const completion = await openai.chat.completions.parse({
        model: "gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `
          #Eres un agente que lee y genera ecenarios con opciones para hacer un minijuego de crea tu propia historia#
          ### Se te proporcionara un fragmento del texto en el cual haras as siguiente estructura ###
          <
          ecenarys: string descricion (Texto narrativo que representa el contenido del escenario, trata de ser (introdutorio,confitivo y continuo si es la primer pagina )) minimo 250 y maximo 400 caracter ,
          page: number descripcion ("Número de página del cuento en la que se ubica este escenario"),
          options: array(object({textOption: string})) descripcion ("Opciones narrativas embebidas en el escenario") minimo de 125 y maximo 200 caracter,
          >
          siempre hace una pregunta para que el usuario puda leer y decirle que procedes hacer en base a las opciones
          `.trim()
          },
          {
            role: "user",
            content: `<title:${contentBook.title}>,<${content}><${content.page++}>`
          }
        ],
        response_format: zodResponseFormat(createYourHistoModel, "event")
      })

      const event = completion.choices[0].message.parsed;
      return event
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

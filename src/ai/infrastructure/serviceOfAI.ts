import { AIRepository } from "../domain/AIRepository";
import { generateEmbedding } from "../../shared/utils/loadModel";
import { EmbeddingModel } from "./model/embeddingModel";
import { Types } from "mongoose";
import { cosineSimilarity } from "../../shared/utils/simility";
import { zodResponseFormat } from "openai/helpers/zod"
import { openai } from "../domain/model";
import { createYourHistoModel, final } from "./model/createYourHistoModel";
import { BookContentModel } from "../../bookContent/infrastructure/model/BookContentModel";
import { parseStringFinal } from "../../shared/utils/parseString";
import { Gamble } from "../../shared/types/createYourHistory/createYourHistory";

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

  async createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any> {
    try {
      const idValid = new Types.ObjectId(idBook)
      const [contentBook] = await BookContentModel.find({ bookId: idValid }, { title: 1, text: 1, _id: 0 })

      const isInitial = gamble === undefined;
      const page = isInitial ? 0 : gamble.page;

      const outOfBounds = page >= contentBook.text.length;

      const prompt = outOfBounds
        ? `<
  title:${gamble?.title ?? contentBook.title}>,
  <ecenario que le diste anteriormente: ${gamble?.ecenary ?? "sin escenario"}>,
  <pagina que leiste anteriormente: ${gamble?.page ?? "sin página"}>,
  <opcion elegida por el usuario: ${gamble?.option ?? "sin opción"}>,
  <escribe el final en base a lo siguiente: ${contentBook.text.at(-1)} descripcion (se libre en hacer que la opcion pueda usar el contenido base con otro contexto diferente y se creativo sin limites )>
  <sabiendo que escribiras el final no hagas preguntas como si dieras mas opciones porque el usuairo pensara quehay mas y no no es asi>
  <y como es el final marcala como completada >
  `
        : isInitial
          ? `
          <title:${contentBook.title}>,
          <contenido en el cual te debes basar la siguiente opción: ${contentBook.text[page]} descripcion (se libre en hacer que la opcion pueda usar el contenido base con otro contexto diferente y se creativo sin limites)>
          <${page}>`
          : `<
  title:${gamble.title}>,
  <ecenario que le diste anteriormente: ${gamble.ecenary}>,
  <pagina que leiste anteriormente: ${gamble.page}>,
  <opcion elegida por el usuario: ${gamble.option}>,
  <contenido en el cual te debes basar la siguiente opción: ${contentBook.text[page]} descripcion (se libre en hacer que la opcion pueda usar el contenido base con otro contexto diferente y se creativo sin limites)>
  >`;

      const completion = await openai.chat.completions.parse({
        model: "gemini-2.5-flash-lite",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `

          # Regla: 1 # 
          # Eres un agente que lee y genera ecenarios con opciones para hacer un minijuego de crea tu propia historia #
          ### Se te proporcionara un fragmento del texto en el cual haras as siguiente estructura ###
          <
          - title: string descipcion ( el titulo debe ser siempre el original ),
          - ecenarys: string descricion (Texto narrativo que representa el contenido del escenario, trata de ser (introdutorio, continuo y simpre con una pregunta haciendo apertura para las preguntas ( contodas la paginas las preguntas ) si es la primer pagina )) minimo 200 y maximo 300 caracter ,
          - page: number descripcion ("Número de página del cuento en la que se ubica este escenario"),
          - options: array(object({textOption: string})) descripcion ("Opciones narrativas embebidas en el escenario") minimo de 125 y maximo 200 caracter,
          >
          * siempre hace una pregunta para que el usuario puda leer y decirle que procedes hacer en base a las opciones *

          # Regla: 2 #
          # aveces cuando ya has echo el primero framento recibiras lo que repospondiste anterior mente #
          ### seria una estructura como lo sigueinte  ###
          <
          
          title: "LA ERA DIGITAL: EL NACIMIENTO DE LA IA",
          ecenarys: descripcion (ecenario creado anteriomente) ,
          page: descripcion (pagiana que te pasron anteriomente ) ,
          options: descripcion ( opcion que eligio el usuairo ),

          >
          ## si no recibes la estructura anterior enfocate en la Regla: 1 ##

          ### si recibes una la orden de hacer el final no quieroquele hagas preguntas para una opcion  ###
          ## centrate en hacer que las opciones sean el guia de como debe ser el siguiente ecenario  ##`.trim()
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: zodResponseFormat(outOfBounds ? final : createYourHistoModel, "event")
      })

      const event = completion.choices[0].message.parsed;
      return event
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

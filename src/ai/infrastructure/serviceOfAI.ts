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

  async createYourHistoryGame(idBook: string): Promise<any> {
    try {
      const idValid = new Types.ObjectId(idBook)
      const [contentBook] = await BookContentModel.find({ bookId: idValid }, { title: 1, text: 1, _id: 0 })

      console.log(parseStringFinal(contentBook));


      const completion = await openai.chat.completions.parse({
        model: "gemini-2.0-flash",
        messages: [
          {
            role: "system",
            content: `
          # Tu tarea es construir una historia interactiva basada en un cuento, utilizando una estructura escalonada de decisiones compatible con el siguiente modelo:
                    
          - title: el titulo de manera de un juego creatu propia hsotorio pero mejor 
          - ecenarys: escenarios narrativos con id, text (debe tener bastante contexto), v (versión), page (número de página).
          - options: decisiones que conectan escenario debe aver dos opciones estrictamente, con idEcenary (origen en que ecenarios deben aparecer esa opcion no mas de 4 caracter), textOption (texto visible), idNextEcenary (destino ecenarios destino deben aparecer esa opcion no mas de 4 caracter), v (versión) debe aber dos opciones por ecenarios.
          - finalys: finales narrativos alcanzados según las opciones, idOptions lista de ids que se tomaron para llegar al final ,textFinal final en base al contenido la cantidad de finales es igual a la cantidad de opciones finales estrictamente.
                    
          # No te limites al texto original. Usalo como inspiración para generar caminos nuevos, versiones alternativas y consecuencias creativas. Cada decisión debe abrir una ruta distinta, que puede llevar a nuevas páginas si es necesario.
          
          #Reglas:
          - Por cada pagian debe haber dos opcines obligatoriamente.
          - Cada pagian despues de la pagina 1 que es la unica que debe tener un solo ecenarios los demas debe tener su version laternativa es obligatorio eso Ejemplo: v1 version origina, v2 version alternativa, si hay mas paginas es el doble del anterior.
          - Cuando cumplas con el numero de pagias debes fiajarte bien las opciones finales cada uno debe tener un final oviamente para legar ebes completa el campo idOptions que es el camino de opciones que creaste 
          
          # Estructura narrativa esperada:Ejemplo (
          ## solo tomalo como ejemplo ##
          - Ejemplo de Página 1: escenario inicial con dos opciones.
          - Ejemplo de Página 2: dos versiones (v1 y v2), cada una con sus propios escenarios y decisiones.
          - Expciacion si hay mas paginas debe ser el doble del anterio en versiones
          - Y así sucesivamente, hasta completar la cantida de paginas se creativo en las opciones que sean contexto y con relacion de la ecenario con sus opciones .
                    
          # Sé creativo: si una opción lleva a una rebelión digital, una utopía tecnológica o una desconexión total, desarrollá ese camino. No repitas el texto original. Construí una historia interactiva ramificada.
                    
          # Devolvé un objeto compatible con el modelo createYourHistoModel. No incluyas explicaciones ni adornos fuera del JSON.
          `.trim()
          },
          {
            role: "user",
            content: `<title:${contentBook.title}>,<${parseStringFinal(contentBook)}>`
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

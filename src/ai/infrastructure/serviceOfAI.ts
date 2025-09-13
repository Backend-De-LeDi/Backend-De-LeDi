import { AIRepository } from "../domain/AIRepository";

export class ConnectionAI implements AIRepository {

     async getIdsForRecommendation(idsBooks: string[]): Promise<string[]> {
          try {
               const req = await fetch("http://127.0.0.1:4590/books", {
                    method: "post", // GET no admite body
                    headers: { "Content-Type": "application/json" }, // typo corregido
                    body: JSON.stringify({ ids: idsBooks }) // estructura explícita
               });
               const res: { bookId: string, score: number }[] = await req.json();
               const recommendations = res.map((recommendation: { bookId: string; score: number }) => recommendation.bookId);
               return recommendations
          } catch (err) {
               console.log(err);
               return []
          }
     }

     async createYourHistoryGame(idBook: string): Promise<any> {
          try {
               const req = await fetch(`http://127.0.0.1:4590/game/createYourHistory/${idBook}`)
               const res = await req.json()
               return res
          } catch (error) {
               console.log(error);
               return null

          }
     }
}
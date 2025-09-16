import { AIRepository } from "../domain/AIRepository";

export class ConnectionAI implements AIRepository {
  async getIdsForRecommendation(idsBooks: string[]): Promise<string[]> {
    try {
      const req = await fetch("http://127.0.0.1:4590/books/recommendations", {
        method: "post", // GET no admite body
        headers: { "Content-Type": "application/json" }, // typo corregido
        body: JSON.stringify({ ids: idsBooks }), // estructura explícita
      });
      const res: { bookId: string; score: number }[] = await req.json();
      const recommendations = res.map((recommendation: { bookId: string; score: number }) => recommendation.bookId);
      return recommendations;
    } catch (err) {
      console.log(err);
      return [];
    }
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

  async createEmbedding(id: string, title: string, summary: string, synopsis: string): Promise<{ msg: string; status: boolean; }> {
    try {
      const req = await fetch("http://127.0.0.1:4590/createEmbeddingOfBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, summary, synopsis }),
      })

      const res: { msg: string; status: boolean; } = await req.json()
      return res
    } catch (err) {
      console.log(err);
      return { msg: "error inesperado en la comunicacion con el servicio", status: false }
    }
  }
}

import { EmbeddingRepository } from "../domain";
import { pipeline } from "@xenova/transformers";

let embedder: any;
let loading = false;

async function loadModel() {
     if (embedder || loading) return;
     loading = true;
     embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
     loading = false;
}

export class EmbeddingDriver implements EmbeddingRepository {


     async createEmbedding384(text: string): Promise<number[]> {
          if (!text || text.trim().length === 0) throw new Error("Texto vacío");
          if (!embedder) await loadModel();

          const output = await embedder(text, { pooling: "mean", normalize: true });
          return Array.from(output.data);
     }

     async createEmbedding768(text: string): Promise<number[]> {
          if (!text || text.trim().length === 0) throw new Error("Texto vacío");

          const res = await fetch("http://localhost:11434/api/embeddings", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                    model: "nomic-embed-text",
                    prompt: text,
               }),
          });

          const data = await res.json();

          if (!data || !Array.isArray(data.embedding)) {
               throw new Error("Embedding inválido o malformado");
          }

          return data.embedding;
     }
}
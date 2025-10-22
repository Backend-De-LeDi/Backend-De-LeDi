// services/embeddingService.ts
import { pipeline } from "@xenova/transformers";

let embedder: any;
let loading = false;

export async function loadModel() {
  if (embedder || loading) return;
  loading = true;
  embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  loading = false;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!text || text.trim().length === 0) throw new Error("Texto vacío");
  if (!embedder) await loadModel();
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

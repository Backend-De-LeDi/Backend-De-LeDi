export async function generateEmbeddingForAi(text: string) {
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

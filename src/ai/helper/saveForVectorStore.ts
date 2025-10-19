import { SaveForVectorStore } from "../applications/embeddings/saveForVectorStore";
import { ConnectionAI } from "../infrastructure/serviceOfAI";

export const serviceAi = new SaveForVectorStore(new ConnectionAI())
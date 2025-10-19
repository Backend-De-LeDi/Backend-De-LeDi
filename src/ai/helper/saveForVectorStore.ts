import { SaveForVectorStore } from "../applications/embeddings/saveForVectorStore";
import { ConnectionAI } from "../infrastructure/serviceOfAI";
import { DeleteBookFromDocuments } from "../applications/embeddings/deleteBookFromDocuments";

export const serviceAi = new SaveForVectorStore(new ConnectionAI())
export const deleteBookFromDocuments = new DeleteBookFromDocuments(new ConnectionAI())
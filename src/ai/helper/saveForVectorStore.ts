import { SaveForVectorStore, SaveForVectorStoreAuthors } from "../applications/embeddings/saveForVectorStore";
import { ConnectionAI } from "../infrastructure/serviceOfAI";
import { DeleteAuthorFromDocuments, DeleteBookFromDocuments } from "../applications/embeddings/deleteBookFromDocuments";

export const serviceAi = new SaveForVectorStore(new ConnectionAI())
export const serviceAiAuthor = new SaveForVectorStoreAuthors(new ConnectionAI())
export const deleteBookFromDocuments = new DeleteBookFromDocuments(new ConnectionAI())
export const deleteAuthorFromDocuments = new DeleteAuthorFromDocuments(new ConnectionAI())

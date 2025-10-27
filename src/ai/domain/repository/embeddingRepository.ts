import { Types } from "mongoose";

export interface EmbeddingRepository {
     createEmbedding768(text: string): Promise<number[]>;
     createEmbedding384(text: string): Promise<number[]>;
}
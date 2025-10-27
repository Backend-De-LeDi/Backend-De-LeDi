import { Types } from "mongoose";

export interface DocumentsRepository {
     insertBookToDocuments(idBoook: Types.ObjectId): Promise<void>;
     deleteBookFromDocuments(idBook: string): Promise<void>;
     insertAuthorToDocuments(authorId: Types.ObjectId): Promise<void>;
     deleteAuthorFromDocuments(idBook: string): Promise<void>;
}
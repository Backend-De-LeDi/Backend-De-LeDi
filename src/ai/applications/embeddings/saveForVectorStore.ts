import { Types } from "mongoose";
import { AIRepository } from "../../domain/services/AIRepository";

export class SaveForVectorStore {
     constructor(private repository: AIRepository) { }

     async exec(idBook: Types.ObjectId) {

          this.repository.insertBookToDocuments(idBook)

     }
}

export class SaveForVectorStoreAuthors {
     constructor(private repository: AIRepository) { }

     async exec(idAuthor: Types.ObjectId) {

          this.repository.insertAuthorToDocuments(idAuthor)

     }
}
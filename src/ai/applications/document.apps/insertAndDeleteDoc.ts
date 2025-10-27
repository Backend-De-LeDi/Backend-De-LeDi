import { DocumentsRepository } from "../../domain";
import { Types } from "mongoose";

export class DocumentsApps {
     constructor(private repository: DocumentsRepository) { }

     async insertBook(idBoook: Types.ObjectId): Promise<void> {
          await this.repository.insertBookToDocuments(idBoook);
     }

     async deleteBook(idBook: string): Promise<void> {
          await this.repository.deleteBookFromDocuments(idBook);
     }

     async insertAuthor(authorId: Types.ObjectId): Promise<void> {
          await this.repository.insertAuthorToDocuments(authorId);
     }

     async deleteAuthor(idBook: string): Promise<void> {
          await this.repository.deleteAuthorFromDocuments(idBook);
     }
}
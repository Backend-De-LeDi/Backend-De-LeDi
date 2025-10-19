import { AIRepository } from "../../domain/services/AIRepository";

export class DeleteBookFromDocuments {
     constructor(private repository: AIRepository) { }

     async exec(idBook: string): Promise<void> {
          await this.repository.deleteBookFromDocuments(idBook)
     }
}
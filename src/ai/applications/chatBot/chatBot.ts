import { AIRepository } from "../../domain/services/AIRepository";

export class ChatBot {
     constructor(private repository: AIRepository) { }
     async run(message: string): Promise<string> {
          return await this.repository.chatBot(message)
     }
}
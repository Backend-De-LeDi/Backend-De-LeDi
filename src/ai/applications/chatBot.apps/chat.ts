import { ChatBotRepository } from "../../domain/repository/chatBotRepository";

export class ChatApp {
  constructor(private repository: ChatBotRepository) {}

  async exec(msg: string, userId: string, session: string): Promise<any> {
    return await this.repository.createChat(msg, userId, session);
  }
}

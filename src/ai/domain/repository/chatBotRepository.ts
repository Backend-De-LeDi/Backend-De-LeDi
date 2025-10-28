export interface ChatBotRepository {
  createChat(msg: string, userId: string, session: string): Promise<{ output: string }[]>;
}

import { AIRepository } from "../domain/AIRepository";
import { Types } from "mongoose";

export class ChatBot {

     constructor(private repository: AIRepository) { }

     async run(idUser: Types.ObjectId, message: string, idSession: string): Promise<any> {
          return this.repository.chatBot(idUser, message, idSession)
     }
}
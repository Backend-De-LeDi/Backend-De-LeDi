import { Types } from "mongoose";
import { ConnectionAI } from "../infrastructure/serviceOfAI";

export class GetCreateYourHistoryGame {
     constructor(private repository: ConnectionAI) { }

     async run(idBook: string): Promise<any> {
          return this.repository.createYourHistoryGame(idBook)
     }

}
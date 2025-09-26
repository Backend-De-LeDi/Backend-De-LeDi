import { ConnectionAI } from "../infrastructure/serviceOfAI";
import { Gamble } from "../../shared/types/createYourHistory/createYourHistory";

export class GetCreateYourHistoryGame {
     constructor(private repository: ConnectionAI) { }

     async run(idBook: string, gamble: Gamble | undefined): Promise<any> {
          return this.repository.createYourHistoryGame(idBook, gamble)
     }

}
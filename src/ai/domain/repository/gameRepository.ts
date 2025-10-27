import { Gamble, Quiz } from "../../../shared/types/gamesTypes/createYourHistory";

export interface GameRepository {
     createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any>;
     quiz(idBook: string, quiz: Quiz | undefined): Promise<any>;
}
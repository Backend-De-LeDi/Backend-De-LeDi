import { Gamble, Quiz } from "../../../shared/types/gamesTypes/gameTypes";

export interface GameRepository {
  createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any>;
  quiz(idBook: string, quiz: Quiz | undefined): Promise<any>;
}

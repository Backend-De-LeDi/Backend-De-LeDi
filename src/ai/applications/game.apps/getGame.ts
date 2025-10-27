import { GameRepository } from "../../domain";
import { Gamble, Quiz } from "../../../shared/types/gamesTypes/gameTypes";

export class GameApps {
  constructor(private repository: GameRepository) {}

  async createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any> {
    return await this.repository.createYourHistoryGame(idBook, gamble);
  }

  async quiz(idBook: string, quiz: Quiz | undefined): Promise<any> {
    return await this.repository.quiz(idBook, quiz);
  }
}

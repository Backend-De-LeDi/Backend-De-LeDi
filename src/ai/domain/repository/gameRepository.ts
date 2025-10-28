import { Gamble, Quiz, ResGameHistory, ResGameHistoryFinal, ResGameQuiz, ResGameQuizFinal } from "../../../shared/types/gamesTypes/gameTypes";

export interface GameRepository {
  createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<ResGameHistory | ResGameHistoryFinal | null>;
  quiz(idBook: string, quiz: Quiz | undefined): Promise<ResGameQuizFinal | ResGameQuiz | null>;
}

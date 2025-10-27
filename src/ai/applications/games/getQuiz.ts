import { AIRepository } from "../../domain/services/AIRepository";
import { Quiz } from "../../../shared/types/gamesTypes/gameTypes";

export class GetQuiz {
  constructor(private repository: AIRepository) {}
  async run(idBook: string, quiz: Quiz | undefined): Promise<any> {
    return this.repository.quiz(idBook, quiz);
  }
}

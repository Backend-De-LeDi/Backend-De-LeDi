import { GameRepository } from "../domain";
import { Types } from "mongoose";
import { Gamble } from "../../shared/types/gamesTypes/gameTypes";
import { BookContentModel } from "../../bookContent/infrastructure/model/BookContentModel";
import { ContentBookLiteral } from "../../shared/types/gamesTypes/gameTypes";
import { PromptFactory } from "../../shared/config/const/prompt";
import { PromptSystem } from "../../shared/class/promptSystem";
import { PromptQuizFactory } from "../../shared/config/const/prompt";
import { PromptSystemQuiz } from "../../shared/class/promptSystem";
import OpenAI from "openai";
import ENV from "../../shared/config/configEnv";
import { zodResponseFormat } from "openai/helpers/zod";
import { final } from "./schemas/games";
import { finalQuiz } from "./schemas/games";
import { createYourHistoModel } from "./schemas/games";
import { quizModel } from "./schemas/games";
import { separator } from "../../shared/utils/consoleSeparator";
import { Quiz } from "../../shared/types/gamesTypes/gameTypes";

export class GameDriver implements GameRepository {
  private openai = new OpenAI({
    apiKey: ENV.GEMINI_API_KEY,
    baseURL: ENV.URL_GEMINI,
  });

  async createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any | void> {
    try {
      const idValid = new Types.ObjectId(idBook);
      const [contentBook] = await BookContentModel.find({ bookId: idValid }, { title: 1, text: 1, _id: 0 });

      const contentBookLiteral: ContentBookLiteral = {
        title: contentBook.title,
        text: contentBook.text.map((entry) => entry.content),
      };
      const isInitial = gamble === undefined;
      const page = isInitial ? 0 : gamble.page;
      const outOfBounds = page >= contentBook.text.length;

      const promptUser = PromptFactory.create(gamble, contentBookLiteral);
      const promptSystem = PromptSystem.getIntancia();

      const completion = await this.openai.chat.completions.parse({
        model: "gemini-2.5-flash-lite",
        temperature: 1.0,
        messages: [
          { role: "system", content: promptSystem.prompt },
          { role: "user", content: promptUser },
        ],
        response_format: zodResponseFormat(outOfBounds ? final : createYourHistoModel, "event"),
      });

      const event = completion.choices[0].message.parsed;

      return event;
    } catch (error) {
      separator();
      console.log(error);
      separator();
    }
  }

  async quiz(idBook: string, quiz: Quiz): Promise<any> {
    try {
      const idValid = new Types.ObjectId(idBook);
      const [contentBook] = await BookContentModel.find({ bookId: idValid }, { title: 1, text: 1, _id: 0 });

      const contentBookLiteral: ContentBookLiteral = {
        title: contentBook.title,
        text: contentBook.text.map((entry) => entry.content),
      };

      const InitialQuiz = quiz === undefined;
      const page = InitialQuiz ? 0 : quiz.page;
      const outOfBounds = page >= contentBook.text.length;

      const promptUser = PromptQuizFactory.create(quiz, contentBookLiteral);
      const promptSystem = PromptSystemQuiz.getIntancia();

      const completion = await this.openai.chat.completions.parse({
        model: "gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: promptSystem.prompt },
          { role: "user", content: promptUser },
        ],
        response_format: zodResponseFormat(outOfBounds ? finalQuiz : quizModel, "event"),
      });

      const event = completion.choices[0].message.parsed;
      return event;
    } catch (error) {
      separator();
      console.log(error);
      separator();
    }
  }
}

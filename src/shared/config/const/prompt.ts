import { Gamble, Quiz } from "../../types/gamesTypes/gameTypes";
import { ContentBookLiteral } from "../../types/gamesTypes/gameTypes";
import { FinalPrompt } from "../../class/finalPrompt";
import { InitialPrompt } from "../../class/initialPrompts";
import { OptionPrompt } from "../../class/optionsPrompt";
import { FinalQuiz } from "../../class/finalPrompt";
import { InitialQuiz } from "../../class/initialPrompts";
import { OptionQuiz } from "../../class/optionsPrompt";

export class PromptFactory {
  static create(gamble: Partial<Gamble> | undefined, contentBook: ContentBookLiteral): string {
    const isInitial = gamble === undefined;
    const page = isInitial ? 0 : gamble.page ?? 0;
    const outOfBounds = page >= contentBook.text.length;

    if (outOfBounds) {
      return new FinalPrompt(gamble ?? {}, contentBook).toString();
    }

    if (isInitial) {
      return new InitialPrompt(contentBook, page).toString();
    }

    return new OptionPrompt(gamble as Gamble, contentBook, page).toString();
  }
}

export class PromptQuizFactory {
  static create(quiz: Partial<Quiz> | undefined, contentBook: ContentBookLiteral): string {
    const isInitial = quiz === undefined;
    const page = isInitial ? 0 : quiz.page ?? 0;
    const outOfBounds = page >= contentBook.text.length;

    if (outOfBounds) {
      return new FinalQuiz(quiz ?? {}, contentBook).toString();
    }
    if (isInitial) {
      return new InitialQuiz(contentBook, page).toString();
    }

    return new OptionQuiz(quiz as Quiz, contentBook, page).toString();
  }
}

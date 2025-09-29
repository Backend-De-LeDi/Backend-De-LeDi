import { Gamble } from "../../types/createYourHistory/createYourHistory";
import { ContentBookLiteral } from "../../types/createYourHistory/createYourHistory";
import { FinalPrompt } from "../../class/finalPrompt";
import { InitialPrompt } from "../../class/initialPrompts";
import { OptionPrompt } from "../../class/optionsPrompt";

export class PromptFactory {
     static create(
          gamble: Partial<Gamble> | undefined,
          contentBook: ContentBookLiteral
     ): string {
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
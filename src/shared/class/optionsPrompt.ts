import { Gamble } from "../types/createYourHistory/createYourHistory";
import { ContentBookLiteral } from "../types/createYourHistory/createYourHistory";

export class OptionPrompt {
     constructor(private gamble: Gamble, private contentBook: ContentBookLiteral, private page: number) { }

     toString(): string {
          return `<
  title:${this.gamble.title}>,
  <ecenario que le diste anteriormente: ${this.gamble.ecenary}>,
  <pagina que leiste anteriormente: ${this.gamble.page}>,
  <opcion elegida por el usuario: ${this.gamble.option}>,
  <contenido en el cual te debes basar la siguiente opción: ${this.contentBook.text[this.page]} descripcion (se libre en hacer que la opcion pueda usar el contenido base con otro contexto diferente y se creativo sin limites)>
  >`;
     }
}
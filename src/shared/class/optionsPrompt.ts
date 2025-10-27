import { Gamble } from "../types/gamesTypes/gameTypes";
import { ContentBookLiteral } from "../types/gamesTypes/gameTypes";

export class OptionPrompt {
  constructor(private gamble: Gamble, private contentBook: ContentBookLiteral, private page: number) {}

  toString(): string {
    return `<
  title:${this.gamble.title}>,
  <ecenario que le diste anteriormente: ${this.gamble.scenery}>,
  <pagina que leiste anteriormente: ${this.gamble.page}>,
  <opcion elegida por el usuario: ${this.gamble.option}>,
  <contenido en el cual te debes basar la siguiente opción: ${
    this.contentBook.text[this.page]
  } descripcion (se libre en hacer que la opcion pueda usar el contenido base con otro contexto diferente y se creativo sin limites)>
  >`;
  }
}

export class OptionQuiz {
  constructor(private quiz: Gamble, private contentBook: ContentBookLiteral, private page: number) {}
  toString(): string {
    return `<
  title:${this.quiz.title}>,
  <escenario que le diste anteriormente: ${this.quiz.scenery}>,
  <pagina que leíste anteriormente: ${this.quiz.page}>,
  <opción elegida por el usuario: ${this.quiz.option}>,
  <contenido en el cual te debes basar la siguiente pregunta: ${this.contentBook.text[this.page]}>,
  <crea una pregunta con 4 opciones y solo una correcta>
  <la pregunta debe estar relacionada con el contenido y el titulo del libro>
  >`;
  }
}

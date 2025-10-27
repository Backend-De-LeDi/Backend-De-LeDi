import { Gamble, Quiz } from "../types/gamesTypes/createYourHistory";
import { ContentBookLiteral } from "../types/gamesTypes/createYourHistory";

export class FinalPrompt {
  constructor(private gamble: Partial<Gamble>, private contentBook: ContentBookLiteral) { }

  toString(): string {
    return `<
  title:${this.gamble.title ?? this.contentBook.title}>,
  <ecenario que le diste anteriormente: ${this.gamble.scenery ?? "sin escenario"}>,
  <pagina que leiste anteriormente: ${this.gamble.page ?? "sin página"}>,
  <opcion elegida por el usuario: ${this.gamble.option ?? "sin opción"}>,
  <escribe el final en base a lo siguiente: ${this.contentBook.text.at(
      -1
    )} descripcion (se libre en hacer que la opcion pueda usar el contenido base con otro contexto diferente y se creativo sin limites )>
  <sabiendo que escribiras el final no hagas preguntas como si dieras mas opciones porque el usuairo pensara quehay mas y no no es asi>
  <y como es el final marcala como completada >
  `;
  }
}

export class FinalQuiz {
  constructor(private quiz: Partial<Quiz>, private contentBook: ContentBookLiteral) { }

  toString(): string {
    return `<
  title:${this.quiz.title ?? this.contentBook.title}>,
  <escenario que le diste anteriormente: ${this.quiz.scenery ?? "sin escenario"}>,
  <pagina que leíste anteriormente: ${this.quiz.page ?? "sin página"}>,
  <opción elegida por el usuario: ${this.quiz.options ?? "sin opción"}>,
  <escribe la pregunta final en base a lo siguiente : ${this.contentBook.text.at(-1)}>
  <sabiendo que escribirás la pregunta final no hagas preguntas como si dieras mas opciones porque el usuario pensara que hay mas y no es asi>
  <y como es la pregunta final marcala como completada>
  `;
  }
}

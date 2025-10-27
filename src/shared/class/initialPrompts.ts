import { ContentBookLiteral } from "../types/gamesTypes/gameTypes";

export class InitialPrompt {
  constructor(private contentBook: ContentBookLiteral, private page: number) {}

  toString(): string {
    return `
     <title:${this.contentBook.title}>,
     <contenido en el cual te debes basar la siguiente opción: ${
       this.contentBook.text[this.page]
     } descripcion (se libre en hacer que la opcion pueda usar el contenido base con otro contexto diferente y se creativo sin limites)>
     <pagina: ${this.page}>`;
  }
}

export class InitialQuiz {
  constructor(private contentBook: ContentBookLiteral, private page: number) {}
  toString(): string {
    return `
      <title:${this.contentBook.title}>,
      <contenido en el cual te debes basar la siguiente pregunta: ${this.contentBook.text[this.page]}>,
      <pagina: ${this.page}>
      <crea una pregunta con 4 opciones y solo una correcta>
      <la pregunta debe estar relacionada con el contenido y el titulo del libro>
      `;
  }
}

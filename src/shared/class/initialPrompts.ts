import { ContentBookLiteral } from "../types/createYourHistory/createYourHistory";

export class InitialPrompt {
     constructor(private contentBook: ContentBookLiteral, private page: number) { }

     toString(): string {
          return `
     <title:${this.contentBook.title}>,
     <contenido en el cual te debes basar la siguiente opción: ${this.contentBook.text[this.page]} descripcion (se libre en hacer que la opcion pueda usar el contenido base con otro contexto diferente y se creativo sin limites)>
     <pagina: ${this.page}>`;
     }
}
import { SearchedBook } from "../types/bookTypes/bookTypes";
import { separator } from "../utils/consoleSeparator";
import chalk from "chalk";
import { Books } from "../../books/domain/books";
import { PreferenceTypes } from "../types/preferenceTypes";

// ? clase que se comunica con la IA
export class ConnectionAI {
  // ? método para enviar los libros de los usuario a la IA
  async sendBooksToAI(books: SearchedBook[]) {
    try {
      const req = await fetch("http://127.0.0.1:4590/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(books),
      });
      const res = await req.json();
      return res;
    } catch (error) {
      separator();
      console.log(chalk("error en las api: sendBooks"));
      separator();
      console.log(error);
      separator();
    }
  }

  // ? método para enviar consultas a las IA
  async sendQuery(query: string) {
    const req = await fetch(`http://127.0.0.1:4590/books?query=${query}`);
    const res = await req.json();
    return res;
  }

  // ? método para subir libros a la IA libros as la IA
  async uploadBookForIA(book: Books) {
    try {
      const req = await fetch("http://127.0.0.1:4590/books/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (!req.ok) {
        const errorRes = await req.json();
        separator();
        console.log(chalk.red(`⛔ Error ${req.status} - ${req.statusText}`));

        if (Array.isArray(errorRes.detail)) {
          errorRes.detail.forEach((err: any) => {
            const path = err.loc?.slice(1).join(".");
            console.log(chalk.yellow(`📛 Campo faltante: ${path}`));
            console.log(`   ❕ Motivo: ${err.msg}`);
          });
        } else {
          console.log(errorRes);
        }

        separator();
        return;
      }

      const res = await req.json();
      console.log(chalk.green("✅ Libro subido con éxito"));
      console.log(res);
    } catch (error) {
      separator();
      console.log(chalk.yellow("⚠️ Error en la API: uploadBookForIA"));
      console.error(error);
      separator();
    }
  }

  // ? método para enviar solo las preferencia del usuario
  async sendPreference(preference: PreferenceTypes) {
    const req = await fetch("http://127.0.0.1:4590/preferenceRecipient", {
      method: "POST",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(preference),
    });

    const res = await req.json();
    return res;
  }
}

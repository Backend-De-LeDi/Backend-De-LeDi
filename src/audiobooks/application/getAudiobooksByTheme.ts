import { Audiobook } from "../domain/Audiobooks";
import { AudiobooksRepository } from "../domain/AudiobooksRepository";
import { SearchedAudiobook } from "../../types/audiobookTypes";

// ? clase que guía al Repositorio a realizar la obtención de libros por tema
export class GetAudiobookByTheme {
  // * constructor que recibe el repositorio de libros
  constructor(private repository: AudiobooksRepository) {}

  // * método que se encarga de ejecutar la lógica de obtención de libros por tema
  async run(theme: string[]): Promise<SearchedAudiobook[]> {
    // * se hace uso del repositorio para obtener los libros por tema
    const books = await this.repository.getAudiobookByTheme(theme);

    // * si no hay libros, se retorna un array vacío
    if (!books) return [];

    // * si hay libros, se retornan
    return books;
  }
}

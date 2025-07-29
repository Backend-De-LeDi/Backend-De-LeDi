import { AudiobooksRepository } from "../domain/audiobooksRepository";
import { SearchedAudiobook } from "../../shared/types/audiobookTypes/audiobookTypes";

// ? Clase que guía al Repositorio a realizar la obtención de libros por subgénero
export class GetAudiobooksBySubgenre {
  // * Constructor que recibe el repositorio de libros
  constructor(private repository: AudiobooksRepository) {}

  // * Método que ejecuta la obtención de libros por subgénero
  async run(subgenre: string[]): Promise<SearchedAudiobook[]> {
    // * Llama al repositorio para obtener los libros por subgénero
    return await this.repository.getAudiobooksBySubgenre(subgenre);
  }
}

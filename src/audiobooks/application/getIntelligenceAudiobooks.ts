import { AudiobooksRepository } from "../domain/audiobooksRepository";
import { Audiobook } from "../domain/audiobooks";
import { SearchedAudiobook } from "../../shared/types/audiobookTypes/audiobookTypes";

// ? Clase que guía al Repositorio a realizar la obtención de libros por inteligencia
export class GetIntelligenceAudiobook {
  // * Constructor que recibe el repositorio de libros
  constructor(private repository: AudiobooksRepository) {}

  // * Método que ejecuta la obtención de libros por inteligencia
  async run(query: string): Promise<SearchedAudiobook[]> {
    // * Llama al repositorio para obtener los libros por inteligencia
    return await this.repository.getIntelligenceAudiobook(query);
  }
}

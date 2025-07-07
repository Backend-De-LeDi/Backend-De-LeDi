import { AudiobooksRepository } from "../domain/AudiobooksRepository";
import { Audiobook } from "../domain/Audiobooks";
import { SearchedAudiobook } from "../../types/audiobookTypes";

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

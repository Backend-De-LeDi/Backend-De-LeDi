import { SearchedAudiobook } from "../../shared/types/audiobookTypes/audiobookTypes";
import { AudiobooksRepository } from "../domain/audiobooksRepository";
// ? Clase que guía al Repositorio a realizar la obtención de todos los libros
export class GetAllAudiobooks {
  // * Constructor que recibe el repositorio de libros
  constructor(private repository: AudiobooksRepository) {}

  // * Método que ejecuta la obtención de todos los libros
  async run(): Promise<SearchedAudiobook[]> {
    // * Llama al repositorio para obtener todos los libros
    return await this.repository.getAllAudiobooks();
  }
}

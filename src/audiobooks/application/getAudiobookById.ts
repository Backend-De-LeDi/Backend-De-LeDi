import { Types } from "mongoose";
import { SearchedAudiobook } from "../../types/audiobookTypes/audiobookTypes";
import { AudiobooksRepository } from "../domain/audiobooksRepository";
// ? Clase que guía al Repositorio a realizar la obtención de un libro por su ID
export class GetAudiobooksById {
  // * Constructor que recibe el repositorio de libros
  constructor(private repository: AudiobooksRepository) {}

  // * Método que ejecuta la obtención del libro por su ID
  async run(id: Types.ObjectId): Promise<SearchedAudiobook | null> {
    // * Llama al repositorio para obtener el libro por su ID
    return await this.repository.getAudiobookById(id);
  }
}

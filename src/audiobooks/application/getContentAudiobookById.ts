import { Types } from "mongoose";
import { AudiobooksRepository } from "../domain/AudiobooksRepository";
// ? Clase que guía al Repositorio a realizar la obtención del contenido de un libro por su ID
export class GetContentAudiobookById {
  // * Constructor que recibe el repositorio de libros
  constructor(private repository: AudiobooksRepository) {}

  // * Método que ejecuta la obtención del contenido del libro por su ID
  async run(id: Types.ObjectId): Promise<string | null> {
    // * Llama al repositorio para obtener el contenido del libro por su ID
    return await this.repository.getContentAudiobookById(id);
  }
}

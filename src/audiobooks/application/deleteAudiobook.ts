import { AudiobooksRepository } from "../domain/audiobooksRepository";
import { Types } from "mongoose";

// ? Clase que guía al Repositorio a realizar la eliminación del libro
export class DeleteAudiobook {
  // * Constructor que recibe el repositorio de libros
  constructor(private repository: AudiobooksRepository) {}

  // * Método que ejecuta la eliminación del libro por su ID
  async run(id: Types.ObjectId): Promise<void> {
    // * Llama al repositorio para eliminar el libro
    await this.repository.deleteAudiobook(id);
  }
}

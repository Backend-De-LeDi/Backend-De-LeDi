import { Audiobook } from "../domain/audiobooks";
import { AudiobooksRepository } from "../domain/audiobooksRepository";

// ? clase que guía al Repositorio a realizar el almacenamiento del libro
export class CreateAudiobook {
  constructor(private repository: AudiobooksRepository) {}

  async run(newAudiobook: Audiobook): Promise<void> {
    await this.repository.createAudiobook(newAudiobook);
  }
}

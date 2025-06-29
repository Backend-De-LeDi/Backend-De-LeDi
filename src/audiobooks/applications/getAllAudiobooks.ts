import { AudioBooks } from "../domain/audiobooks";
import { AudiobookRepository } from "../domain/audiobooksRepository";

// * clase de aplicación de uso para para ejecutar el método getAllAudiobooks del repositorio de mongoAudioRepository
export class GetAllAudiobooks {
  
  constructor(private repository: AudiobookRepository) {}
  
  async run(): Promise<AudioBooks[]> {
  
    return await this.repository.getAllAudiobooks();
  
  }

}


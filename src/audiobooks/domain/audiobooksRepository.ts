import { AudioBooks } from "./audiobooks";
import type { Types } from "mongoose";

// * Repositorio que especifica las aplicaciones de uso para el almacenamiento de los datos

export interface AudiobookRepository {
  createAudiobooks: (audioBook: AudioBooks) => Promise<void>;
  getAllAudiobooks: () => Promise<AudioBooks[]>;
  getAudiobooksById: (id: Types.ObjectId) => Promise<AudioBooks | boolean>;
  deleteAudiobook: (id: Types.ObjectId) => Promise<boolean>;
}

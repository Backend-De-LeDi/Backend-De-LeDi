import { Types } from "mongoose";
import { Audiobook } from "./audiobooks";
import { SearchedAudiobook } from "../../types/audiobookTypes/audiobookTypes";

// ? Interfaz que define las operaciones del repositorio de Audiolibros
export interface AudiobooksRepository {
  createAudiobook(audiobook: Audiobook): Promise<void>;
  getAllAudiobooks(): Promise<SearchedAudiobook[]>;
  deleteAudiobook(id: Types.ObjectId): Promise<void>;
  getAudiobookById(id: Types.ObjectId): Promise<SearchedAudiobook | null>;
  getIntelligenceAudiobook(query: string): Promise<SearchedAudiobook[]>;
  getAudiobooksBySubgenre(subgenre: string[]): Promise<SearchedAudiobook[]>;
  getContentAudiobookById(id: Types.ObjectId): Promise<string | null>;
  getAudiobookByTheme(theme: string[]): Promise<SearchedAudiobook[]>;
}

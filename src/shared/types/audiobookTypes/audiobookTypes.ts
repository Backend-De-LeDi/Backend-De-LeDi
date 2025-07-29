import { Types, Document } from "mongoose";
import { ContentAudiobook, FullContentAudiobook } from "./contentAudiobookTypes";

// ? interfaz para la imagen de portada del audiolibro
export interface AudiobookCoverImage {
  idAudiobookCoverImage: string;
  url_secura: string;
}

// ? interfaz para el contenido del audiolibro
export interface PropAudiobooks extends Document {
  title: string;
  author: Types.ObjectId[];
  summary: string;
  subgenre: string[];
  language: string;
  available: boolean;
  yearBook: Date;
  synopsis: string;
  theme: string[];
  genre: string;
  level: string;
}

// ? interfaz para el modelo de almacenamiento de los audiolibro
export interface IAudiobook extends PropAudiobooks {
  audiobookContent: ContentAudiobook;
  audiobookCoverImage: AudiobookCoverImage;
  format: string;
}

// ? interfaz para el audiolibro que se busca en la base de datos
export interface SearchedAudiobook extends IAudiobook {
  _id: unknown;
  __v: number;
}

// ? interfaz para el contenido del audiolibro completo
export interface AudiobookContent extends Omit<SearchedAudiobook, "content"> {
  content: FullContentAudiobook;
}

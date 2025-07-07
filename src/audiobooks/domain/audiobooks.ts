import { AudiobookCoverImage } from "../../types/audiobookTypes";
import { ContentAudiobook } from "../../types/contentAudiobookTypes";
import type { Types } from "mongoose";

// ? Clase que representa un libro en el dominio de la aplicación
export class Audiobook {
  constructor(
    public title: string,
    public summary: string,
    public author: Types.ObjectId[],
    public subgenre: string[],
    public language: string,
    public available: boolean,
    public contentAudiobook: ContentAudiobook,
    public audiobookCoverImage: AudiobookCoverImage,
    public theme: string[],
    public genre: string,
    public synopsis: string,
    public level: string,
    public yearBook: Date
  ) {}
}

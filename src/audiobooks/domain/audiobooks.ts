import { AudiobookCoverImage } from "../../shared/types/audiobookTypes/audiobookTypes";
import { ContentAudiobook } from "../../shared/types/audiobookTypes/contentAudiobookTypes";
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
    public synopsis: string,
    public genre: string,
    public level: string,
    public yearBook: Date,
    public format: string
  ) {}
}

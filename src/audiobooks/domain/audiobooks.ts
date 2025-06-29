import { CoverImage } from "../../types/bookTypes";
import type { Types } from "mongoose";
import { ContentAudioBook, ContentBook } from "../../types/contentBook";

// definimos el dominio ( como se va almacenar los audiolibros )
export class AudioBooks {
  constructor(
    public title: string,
    public descriptions: string,
    public author: Types.ObjectId[],
    public subgenre: string[],
    public language: string,
    public available: boolean,
    public content: ContentAudioBook,
    public coverImage: CoverImage,
    public summary: string,
    public genreType: string,
    public yearBook: Date
  ) {}
}

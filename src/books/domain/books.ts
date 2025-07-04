import { CoverImage } from "../../types/bookTypes";
import { ContentBook } from "../../types/contentBook";
import type { Types } from "mongoose";

// ? Clase que representa un libro en el dominio de la aplicación
export class Books {
  constructor(
    public title: string,
    public summary: string,
    public author: Types.ObjectId[],
    public subgenre: string[],
    public language: string,
    public available: boolean,
    public content: ContentBook,
    public coverImage: CoverImage,
    public synopsis: string,
    public yearBook: Date,
    public theme: string[]
  ) {}
}

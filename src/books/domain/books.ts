import { BookCoverImage } from "../../types/bookTypes/bookTypes";
import { ContentBook } from "../../types/bookTypes/contentBookTypes";
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
    public bookCoverImage: BookCoverImage,
    public contentBook: ContentBook,
    public synopsis: string,
    public yearBook: Date,
    public theme: string[],
    public genre: string,
    public level: string
  ) {}
}

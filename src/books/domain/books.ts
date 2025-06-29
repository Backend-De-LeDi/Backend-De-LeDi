import { CoverImage } from "../../types/bookTypes";
import { ContentBook } from "../../types/contentBook";
import type { Types } from "mongoose";

// definimos el dominio ( como se van a recibir los libros para almacenarlos )
export class Books {
  constructor(
    public title: string,
    public descriptions: string,
    public author: Types.ObjectId[],
    public subgenre: string[],
    public language: string,
    public available: boolean,
    public content: ContentBook,
    public coverImage: CoverImage,
    public yearBook: Date,
    public genreType: string
  ) {}
}

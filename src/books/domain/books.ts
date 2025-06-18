import { coverImage } from "../../types/bookTypes";
import { ContentBook } from "../../types/contentBook";
import type { Types } from "mongoose";

// definimos el dominio ( como se va almacenar los libros )
export class Books {
  constructor(
    public title: string,
    public descriptions: string,
    public author: Types.ObjectId,
    public category: string[],
    public language: string,
    public available: boolean,
    public content: ContentBook,
    public coverImage: coverImage,
    public summary: string
  ) {}
}

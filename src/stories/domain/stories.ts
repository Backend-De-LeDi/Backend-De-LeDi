import { coverImage } from "../../types/bookTypes";
import type { Types } from "mongoose";
import { ContentStories } from "../../types/contentStories";

// definimos el dominio ( como se va almacenar los libros )
export class Stories {
  constructor(
    public title: string,
    public descriptions: string,
    public author: Types.ObjectId,
    public subgenre: string[],
    public language: string,
    public available: boolean,
    public content: ContentStories,
    public coverImage: coverImage,
    public summary: string
  ) {}
}

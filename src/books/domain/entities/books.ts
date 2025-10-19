import { BookCoverImage } from "../../../shared/types/bookTypes/bookTypes";
import { ContentBook } from "../../../shared/types/bookTypes/contentBookTypes";
import type { Types } from "mongoose";

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
    public yearBook: string,
    public theme: string[],
    public genre: string,
    public level: string,
    public format: string,
    public fileExtension: string,
    public totalPages?: number,
    public duration?: number
  ) { }
}

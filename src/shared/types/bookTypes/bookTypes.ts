import { Types, Document } from "mongoose";
import { ContentBook, FullContentBook } from "./contentBookTypes";

export interface BookCoverImage {
  idBookCoverImage: string;
  url_secura: string;
}

export interface PropBooks extends Document {
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

export interface IBook extends PropBooks {
  contentBook: ContentBook;
  bookCoverImage: BookCoverImage;
  format: string;
}

export interface SearchedBook extends IBook {
  _id: unknown;
  __v: number;
}

export interface BookContent extends Omit<SearchedBook, "content"> {
  content: FullContentBook;
}

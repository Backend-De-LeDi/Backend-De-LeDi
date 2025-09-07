import { Types, Document, NumberExpression } from "mongoose";
import { ContentBook, FullContentBook } from "./contentBookTypes";

export interface BookCoverImage {
  idBookCoverImage: string;
  url_secura: string;
}

export interface FullBookCoverImage extends BookCoverImage {
  _id: string;
}

export interface PropBooks extends Document {
  title: string;
  author: Types.ObjectId[];
  summary: string;
  subgenre: string[];
  language: string;
  available: boolean;
  yearBook: string;
  synopsis: string;
  theme: string[];
  genre: string;
  level: string;
  format: string;
  totalPages?: number;
  duration?: number;
  fileExtension: string;
}

export interface IBook extends PropBooks {
  contentBook: ContentBook;
  bookCoverImage: BookCoverImage;
}

export interface SearchedBook extends IBook {
  _id: unknown;
  __v: number;
}

export interface BookContent extends Omit<SearchedBook, "content"> {
  content: FullContentBook;
}

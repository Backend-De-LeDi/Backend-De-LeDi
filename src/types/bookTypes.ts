import { Types, Document } from "mongoose";
import { ContentBook, FullContentBook } from "./contentBook";

export interface coverImage {
  idCoverImage: string;
  url_secura: string;
}

export interface PropBooks extends Document {
  title: string;
  author: Types.ObjectId;
  descriptions: string;
  category: string[];
  available: boolean;
  userId: Types.ObjectId;
  language: string;
  summary: string;
}

export interface IBook extends PropBooks {
  createdAt: Date;
  content: ContentBook;
  coverImage: coverImage;
  pathInternal: string;
}

export interface SearchedBook extends IBook {
  _id: string;
  __v: number;
}

export interface BookContent extends Omit<SearchedBook, "content"> {
  content: FullContentBook;
}

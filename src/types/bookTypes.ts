import { Types, Document } from "mongoose";
import { FullContentBook } from "./contentBook";

export interface coverImage {
  id_image: string;
  url_secura: string;
}

export interface PropBooks extends Document {
  title: string;
  author: string;
  descriptions: string;
  category: string[];
  available: boolean;
  userId: Types.ObjectId;
  language: string;
  summary: string;
}

export interface IBook extends PropBooks {
  createdAt: Date;
  content: Types.ObjectId;
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

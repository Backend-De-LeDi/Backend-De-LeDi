import { Types, Document } from "mongoose";
import { ContentAudioBook, ContentBook, FullContentBook } from "./contentBook";

export interface CoverImage {
  idCoverImage: string;
  url_secura: string;
}

export interface PropBooks extends Document {
  title: string;
  author: Types.ObjectId[];
  descriptions: string;
  subgenre: string[];
  language: string;
  available: boolean;
  yearBook: Date;
  summary: string;
  genreType: string;
}

export interface PropAudiobooks extends PropBooks {
  summary: string;
}

export interface IBook extends PropBooks {
  content: ContentBook;
  coverImage: CoverImage;
}

export interface SearchedBook extends IBook {
  _id: string;
  __v: number;
}

export interface IAudioBook extends Omit<IBook, "content"> {
  summary: string;
  content: ContentAudioBook;
}

export interface SearchedAudiobook extends IAudioBook {
  _id: string;
  __v: number;
}

export interface BookContent extends Omit<SearchedBook, "content"> {
  content: FullContentBook;
}

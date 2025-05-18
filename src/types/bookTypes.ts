import { Types, Document } from "mongoose";

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
}

export interface IBook extends PropBooks {
  createdAt: Date;
  content: Types.ObjectId;
  coverImage: coverImage;
}

export interface SearchedBook extends IBook {
  _id: string;
  __v: number;
}

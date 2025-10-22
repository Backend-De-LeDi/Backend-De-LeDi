import { Types, Document } from "mongoose";
import { ContentBook, FullContentBook } from "./contentBookTypes";

// Imagen de portada básica
export interface BookCover {
  idBookCoverImage: string;
  url_secura: string;
}

// Imagen de portada con _id persistente
export interface BookCoverFull extends BookCover {
  _id: string;
}

// Entidad base de libro (persistencia)
export interface BookBase extends Document {
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

// Libro con contenido y portada
export interface BookDetail extends BookBase {
  contentBook: ContentBook;
  bookCoverImage: BookCover;
}

// Libro usado en búsquedas
export interface BookSearch extends BookDetail {
  _id: unknown;
  __v: number;
}

// Libro con contenido expandido
export interface BookWithContent extends Omit<BookSearch, "content"> {
  content: FullContentBook;
}
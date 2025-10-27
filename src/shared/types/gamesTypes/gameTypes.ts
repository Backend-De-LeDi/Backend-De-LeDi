import { Document } from "mongoose";

export interface Gamble {
  title: string;
  scenery: string;
  page: number;
  option: string;
  score: number;
}

export type ContentBookLiteral = {
  title: string;
  text: string[];
};

export interface QuizOption {
  text: string;
  status: boolean;
}

export interface Quiz extends Omit<Gamble, "option"> {
  options: QuizOption;
}

export type ContentBookMongoose = Document<
  unknown,
  {},
  {
    title: string;
    text: { page: number; content: string }[];
  }
>;

interface Option {
  textOption: string;
  score: number;
}

export interface ResGame {
  title: string;
  scenery: string;
  page: number;
  options?: Option[];
  completed?: boolean;
}

export interface tempGamble {
  idBook: string;
  idUser: string;
  options: Option[];
  total: number;
}

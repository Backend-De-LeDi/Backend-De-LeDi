import { Document } from "mongoose";

export interface Gamble {
  title: string;
  ecenary: string;
  page: number;
  option: string;
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

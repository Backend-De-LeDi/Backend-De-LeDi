import { Document } from "mongoose";

export interface Gamble {
  title: string;
  scenery: string;
  page: number;
  option: string;
  score: number;
}

export interface Quiz extends Omit<Gamble, "option"> {
  option: QuizOption;
}

export interface QuizOption {
  text: string;
  status: boolean;
}

export type ContentBookLiteral = {
  title: string;
  text: string[];
};

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


export interface tempGamble {
  idBook: string;
  idUser: string;
  options: Option[];
  total: number;
}

export interface ResGameQuizFinal {
  title: string;
  completed: boolean;
  textCompleted: string;
}
export interface ResGameQuiz {
  title: string;
  scenery: string;
  page: number;
  options: {
    score: number;
    status: boolean;
    textOption: string;
  }[];
}

export interface ResGameHistoryFinal {
  title: string;
  scenery: string;
  page: number;
  completed: boolean;
}
export interface ResGameHistory {
  title: string;
  scenery: string;
  page: number;
  options: {
    score: number;
    textOption: string;
  }[];
}
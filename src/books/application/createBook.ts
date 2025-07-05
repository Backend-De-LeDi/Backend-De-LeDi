import { Books } from "../domain/books";
import { BooksRepository } from "../domain/booksRepository";
import type { Types } from "mongoose";
import { CoverImage } from "../../types/bookTypes";
import { ContentBook } from "../../types/contentBook";

// ? clase que guía al Repositorio a realizar el almacenamiento del libro
export class BookCreate {
  constructor(private repository: BooksRepository) {}

  async run(
    title: string,
    summary: string,
    author: Types.ObjectId[],
    subgenre: string[],
    language: string,
    available: boolean,
    content: ContentBook,
    coverImage: CoverImage,
    theme: string[],
    synopsis: string,
    genre: string,
    level: string,
    yearBook?: Date
  ): Promise<void> {
    const book = new Books(title, summary, author, subgenre, language, available, content, coverImage, synopsis, yearBook ?? new Date(), theme, genre, level);

    await this.repository.createBook(book);
  }
}

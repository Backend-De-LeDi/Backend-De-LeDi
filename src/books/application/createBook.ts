import { Books } from "../domain/books";
import { BooksRepository } from "../domain/booksRepository";
import type { Types } from "mongoose";
import { CoverImage } from "../../types/bookTypes";
import { ContentBook } from "../../types/contentBook";

//clase que limita al Repositorio a realizar el almacenamiento del libro
export class BookCreate {
  constructor(private repository: BooksRepository) {}

  async run(
    title: string,
    descriptions: string,
    author: Types.ObjectId[],
    subgenre: string[],
    language: string,
    available: boolean,
    content: ContentBook,
    coverImage: CoverImage,
    genreType: string,
    summary: string,
    yearBook?: Date
  ): Promise<void> {
    const book = new Books(
      title,
      descriptions,
      author,
      subgenre,
      language,
      available,
      content,
      coverImage,
      summary,
      yearBook ?? new Date(),
      genreType
    );

    // console.log('datos ingresados al método run de la clase BookCreate:',book);

    await this.repository.createBook(book);
  }
}

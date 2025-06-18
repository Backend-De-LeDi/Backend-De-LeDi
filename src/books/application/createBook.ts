import { Books } from "../domain/books";
import { BooksRepository } from "../domain/booksRepository";
import type { Types } from "mongoose";
import { coverImage } from "../../types/bookTypes";
import { ContentBook } from "../../types/contentBook";

//clase que limita al Repositorio a realizar el almacenamiento del libro
export class BookCreate {
  constructor(private repository: BooksRepository) {}

  async run(
    title: string,
    descriptions: string,
    author: Types.ObjectId,
    category: string[],
    language: string,
    available: boolean,
    content: ContentBook,
    coverImage: coverImage,
    summary: string
  ): Promise<void> {
    const book = new Books(title, descriptions, author, category, language, available, content, coverImage, summary);

    // console.log('datos ingresados al método run de la clase BookCreate:',book);

    await this.repository.createBook(book);
  }
}

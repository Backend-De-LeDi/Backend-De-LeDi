import { Books } from "../../domain/books";
import { BooksRepository } from "../../domain/booksRepository";
import type { Types } from "mongoose";
import { coverImage } from "../../../types/bookTypes";

export class BookCreate {
  constructor(private repository: BooksRepository) {}

  async run(
    title: string,
    descriptions: string,
    author: string,
    userId: Types.ObjectId,
    category: string[],
    language: string,
    available: boolean,
    content: Types.ObjectId,
    pathInternal: string,
    coverImage: coverImage
  ): Promise<void> {
    const book = new Books(title, descriptions, author, userId, category, language, available, content, pathInternal, coverImage);

    await this.repository.createBook(book);
  }
}

import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";

export class GetBooksByFiltering {
  constructor(private repository: BooksRepository) { }
  async run(theme: string[], subgenre: string[], yearBook: string[], genre: string[], format: string[], level?: string): Promise<SearchedBook[]> {
    return await this.repository.getBooksByFiltering(theme, subgenre, yearBook, genre, format, level);
  }
}

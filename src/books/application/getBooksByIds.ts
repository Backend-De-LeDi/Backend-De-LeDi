import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { BooksRepository } from "../domain/booksRepository";
import { Types } from "mongoose";

// ? caso de uso que permite obtener libros en base a una lista de ids proporcionados
export class GetBooksByIds {
  constructor(private booksRepository: BooksRepository) {}

  async run(ids: Types.ObjectId[]): Promise<SearchedBook[]> {
    return await this.booksRepository.getBooksByIds(ids);
  }
}

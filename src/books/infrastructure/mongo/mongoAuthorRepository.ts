import { BooksAuthorRepository } from "../../domain/booksAuthorRepository";
import { Types } from "mongoose";
import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { BookModel } from "../model/books.model";

export class MongoAuthorRepository implements BooksAuthorRepository {

     async getBookByAuthorId(idsAuthor: Types.ObjectId): Promise<BookSearch[]> {
          const books = await BookModel.find({ author: { $in: [idsAuthor] } }).populate("author", "fullName");
          return books;
     }

}
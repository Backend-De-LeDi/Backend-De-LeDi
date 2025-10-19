import { BooksCrudRepository } from "../../domain/booksCrudRepository";
import { Books } from "../../domain/entities/books";
import { BookModel } from "../model/books.model";
import { Types } from "mongoose";
import { extractTextByPage } from "../../../shared/utils/pdfService";
import { serviceContainer } from "../../../shared/services/serviceContainer";
import { serviceAi } from "../../../ai/helper/saveForVectorStore";
import { BookSearch } from "../../../shared/types/bookTypes/bookTypes";
import { EmbeddingModel } from "../../../ai/infrastructure/model/embeddingModel";

export class MongoCrudRepository implements BooksCrudRepository {

     //  🔄️
     async createBook(book: Books): Promise<void> {
          const newBook = new BookModel(book);
          const result = await newBook.save();
          const id: Types.ObjectId = result._id as Types.ObjectId;
          if (result.genre === "Narrativo") {
               const url = result.contentBook.url_secura;
               const text = await extractTextByPage(url);
               const title = result.title;
               await serviceContainer.bookContent.createBookContent.run(id, title, text);
          }

          await serviceContainer.ai.createEmbedding.run(id, result.title, result.summary, result.synopsis);
          await serviceAi.exec(id)
     }

     //  ✅
     async getAllBooks(): Promise<BookSearch[]> {
          const books = await BookModel.find()
               .populate("author", "fullName")
               .sort({ createdAt: -1 });

          return books;
     }

     //  ✅
     async updateBookById(id: Types.ObjectId, book: Books): Promise<void> {
          await BookModel.findByIdAndUpdate(id, book);
     }

     //  🔄️
     async deleteBook(id: Types.ObjectId): Promise<BookSearch | null> {
          return await BookModel.findByIdAndDelete(id);

          await EmbeddingModel.deleteMany({ bookId: id });
     }

     //  ✅
     async getBookById(id: Types.ObjectId): Promise<BookSearch | null> {
          const book: BookSearch | null = await BookModel.findById(id).populate("author", "fullName");

          if (!book) return null;

          return book;
     }
}
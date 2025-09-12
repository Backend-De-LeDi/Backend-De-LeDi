import { Types } from "mongoose";
import { ConnectionAIRepository } from "../domains/connectionAIRepository";
import { BookModel } from "../../books/infrastructure/model/books.model";
import { BookProgressModel } from "../../userPogressBooks/infrastructure/models/BookProgressModel";
export class ConnectionAI implements ConnectionAIRepository {

     async getIdsForRecommendation(idsBooks: Types.ObjectId[]): Promise<Types.ObjectId[]> {
          console.log(idsBooks)
          return idsBooks
     }

}
import { Types } from "mongoose";
import { AIRepository } from "../../domain/services/AIRepository";

export class GetAllVectorStoresMemoryByIdUser {
     constructor(private repository: AIRepository) { }
     async run(idUser: Types.ObjectId) {
          return await this.repository.getAllVectorStoresMemoryByIdUser(idUser)
     }
}
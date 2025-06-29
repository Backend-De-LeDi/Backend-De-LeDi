import { Types } from "mongoose";
import { AudiobookRepository } from "../domain/audiobooksRepository";

// * aplicación de uso para la eliminación de audiolibros
export class DeleteAudiobook {

  constructor(private repository: AudiobookRepository) {}
  
  async run(id: Types.ObjectId):Promise<boolean> {
  
   const isDeleted = await this.repository.deleteAudiobook(id);
     
   if(!isDeleted) return false
   
   return true
  
  }
}

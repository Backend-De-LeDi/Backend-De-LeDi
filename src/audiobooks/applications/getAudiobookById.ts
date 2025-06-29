import { Types } from "mongoose";
import { AudioBooks } from "../domain/audiobooks";
import { AudiobookRepository } from "../domain/audiobooksRepository";

// * clase con la aplicación de uso para el MongoRepository.ts

export class GetAudiobooksById {

     constructor(private repository:AudiobookRepository){}

     async run(id:Types.ObjectId):Promise<AudioBooks | boolean >{

          const audioBook = await this.repository.getAudiobooksById(id)

          if(!audioBook) return false

          return audioBook
     }    

}
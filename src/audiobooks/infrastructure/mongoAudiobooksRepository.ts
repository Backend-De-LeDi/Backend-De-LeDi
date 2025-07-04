import { AudioBooks } from "../domain/audiobooks";
import { AudioBookModel } from "./model/audiobookModel";
import { AudiobookRepository } from "../domain/audiobooksRepository";
import { Types } from "mongoose";
import { deleteCoverImageInCloudinary } from "../../shared/utils/deleteCoverImageInCloudinary";
import { deleteAudiobookInCloudinary } from "../../shared/utils/deleteAudiobookInCloudinary";

// * Repositorio de mongo que implementa todos los usos que tiene el repositorio principal AudiobookRepository
export class MongoAudiobooksRepository implements AudiobookRepository {
  // * método para que se pueda crear un audio libro
  async createAudiobooks(audioBook: AudioBooks): Promise<void> {
    const newAudioBook = new AudioBookModel(audioBook);

    await newAudioBook.save();
  }

  // * método para obtener todo los audiolibros
  async getAllAudiobooks(): Promise<AudioBooks[]> {
    const audiobook = await AudioBookModel.find();

    return audiobook;
  }

  // * método que permite eliminar un audio libro de la bases de datos
  async deleteAudiobook(id: Types.ObjectId): Promise<boolean> {
    const audioBookToDelete = await AudioBookModel.findById(id);

    if (!audioBookToDelete) return false;

    await deleteCoverImageInCloudinary(
      audioBookToDelete.coverImage.idCoverImage
    );
    await deleteAudiobookInCloudinary(audioBookToDelete.content.idContentBook);

    const audiobookDeleted = await AudioBookModel.findByIdAndDelete(id);

    if (!audiobookDeleted) return false;

    return true;
  }

  // * método que permite obtener un audiobook de la base de datos
  async getAudiobooksById(id: Types.ObjectId): Promise<AudioBooks | boolean> {
    const audiobook = await AudioBookModel.findById(id);

    if (!audiobook) return false;

    return audiobook;
  }
}

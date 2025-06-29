import { AudioBooks } from "../domain/audiobooks";
import { AudiobookRepository } from "../domain/audiobooksRepository";
import { Types } from "mongoose";
import { ContentAudioBook, ContentBook } from "../../types/contentBook";
import { CoverImage } from "../../types/bookTypes";

// * aplicación de uso para la creación de un audiolibro
export class CreateAudioBooks {
  
  constructor(private repository: AudiobookRepository) {}

  // * método para hacer uso de la clase
  async run(
    title: string,
    descriptions: string,
    author: Types.ObjectId[],
    subgenre: string[],
    language: string,
    available: boolean,
    content: ContentAudioBook,
    coverImage: CoverImage,
    summary: string,
    genreType: string,
    yearBook: Date
  ): Promise<void> {
    const audiobook = new AudioBooks(
      title,
      descriptions,
      author,
      subgenre,
      language,
      available,
      content,
      coverImage,
      summary,
      genreType,
      yearBook ?? new Date()
    );

    // * activación del método que existe en el repositorio AudiobooksRepository
    await this.repository.createAudiobooks(audiobook);
  }
}

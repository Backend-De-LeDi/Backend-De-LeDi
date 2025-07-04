import { AudioBooks } from "../domain/audiobooks";
import { AudiobookRepository } from "../domain/audiobooksRepository";
import { ContentBook } from "../../types/contentBook";
import { Types } from "mongoose";
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
    content: ContentBook,
    coverImage: CoverImage,
    summary: string,
    theme: string[],
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
      yearBook,
      theme
    );

    // * activación del método que existe en el repositorio AudiobooksRepository
    await this.repository.createAudiobooks(audiobook);
  }
}

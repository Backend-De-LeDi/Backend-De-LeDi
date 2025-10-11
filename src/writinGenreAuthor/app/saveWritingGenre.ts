import { ISaveWritingGenreAuthor } from "../domain/writingGenreRepo";

export class SaveWritingGenreAuthor {
     constructor(private readonly saveWritingGenre: ISaveWritingGenreAuthor) { }
     async run(paramas: { idAuthor: number, idWritingGenre: number[] }): Promise<void> {
          await this.saveWritingGenre.saveWritingGenreAuthor(paramas);
     }
}
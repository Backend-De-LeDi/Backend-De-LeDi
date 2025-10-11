import { ISaveWritingGenre } from "../domain/writingGenreRepo";

export class SaveWritingGenre {
     constructor(private readonly saveWritingGenre: ISaveWritingGenre) { }
     async run(name: string[]): Promise<any[]> {
          return await this.saveWritingGenre.saveWritingGenre(name);
     }
}
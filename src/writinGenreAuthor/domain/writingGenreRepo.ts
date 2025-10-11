export interface ISaveWritingGenreAuthor {
     saveWritingGenreAuthor(paramas: { idAuthor: number, idWritingGenre: number[] }): Promise<void>;
}
import { Author } from "../entidades/author.Types";


export interface ISaveAuthorRepository {
    crateAuthor(author: Author): Promise<Author>;
}
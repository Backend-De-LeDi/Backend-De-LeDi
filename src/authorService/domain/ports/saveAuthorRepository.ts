import { Author } from "../entidades/author.Types";


export interface ISaveAuthorRepository {
    createAuthor(author: Author): Promise<Author | false>;
}
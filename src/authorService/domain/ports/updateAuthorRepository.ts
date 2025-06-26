import { Author } from "../entidades/author.Types";

export interface UpdateAuthorRepository {

    updateAuthor(id: any, author: Partial<Author>): Promise<Author | null>;
}

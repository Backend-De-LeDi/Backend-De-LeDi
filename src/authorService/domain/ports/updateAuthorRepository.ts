import { Author } from "../entidades/author.Types";

export interface UpdateAuthorRepository {

    updateAuthor(id: string, author: Partial<Author>): Promise<Author | null>;
}

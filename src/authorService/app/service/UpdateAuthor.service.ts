import { Author } from "../../domain/entidades/author.Types";
import { UpdateAuthorRepository } from "../../domain/ports/updateAuthorRepository";



export class UpdateAuthor implements UpdateAuthorRepository {
    constructor(private readonly updateAuthors: UpdateAuthorRepository) { }
    async updateAuthor(id: any, author: Partial<Author>): Promise<Author | null> {
        return await this.updateAuthors.updateAuthor(id, author)
    }
}
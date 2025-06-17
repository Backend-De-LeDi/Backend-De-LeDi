import { Author } from "../../domain/entidades/author.Types";
import { ISaveAuthorRepository } from "../../domain/ports/saveAuthorRepository";



export class CreateAuthor {
    constructor(
        private readonly saveAuthor: ISaveAuthorRepository
    ) { }
    async saveAuthors(date: Author): Promise<Author> {
        const saveAuthors = await this.saveAuthor.crateAuthor(date)
        return saveAuthors
    }
}
import { Author } from "../../domain/entidades/author.Types";
import { FindAuthor } from "../../domain/ports/findAuthorRepository";
import { UpdateAuthorRepository } from "../../domain/ports/updateAuthorRepository";



export class UpdateAuthor implements UpdateAuthorRepository {
    constructor(private readonly updateAuthors: UpdateAuthorRepository,
        private readonly uniqueAuthor: FindAuthor
    ) { }

    async updateAuthor(id: any, author: Author): Promise<Author | null> {
        const authorExist = await this.uniqueAuthor.findByName(author.name);
        if (authorExist) {
            throw new Error("Email already in use");
        }
        return await this.updateAuthors.updateAuthor(id, author);
    }
}
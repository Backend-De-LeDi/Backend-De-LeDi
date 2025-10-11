import { Author } from "../../domain/entidades/author.Types";
import { FindAuthor } from "../../domain/ports/findAuthorRepository";
import { UpdateAuthorRepository } from "../../domain/ports/updateAuthorRepository";


export class UpdateAuthor implements UpdateAuthorRepository {
    constructor(private readonly updateAuthors: UpdateAuthorRepository,
        private readonly uniqueAuthor: FindAuthor,
    ) { }

    async updateAuthor(id: any, author: Author): Promise<Author | null> {
        console.log(author);

        const authorExist = await this.uniqueAuthor.findByName(author.fullName);
        if (authorExist) {
            return null
        }

        return await this.updateAuthors.updateAuthor(id, author);
    }
}
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { Author } from "../../domain/entidades/author.Types";
import { FindAuthor } from "../../domain/ports/findAuthorRepository";
import { UpdateAuthorRepository } from "../../domain/ports/updateAuthorRepository";



export class UpdateAuthor implements UpdateAuthorRepository {
    constructor(private readonly updateAuthors: UpdateAuthorRepository,
        private readonly uniqueAuthor: FindAuthor,
    ) { }

    async updateAuthor(id: any, author: Author): Promise<Author | null> {
        if (author.avatar) {
            const author_file = await this.uniqueAuthor.findById(id)
            if (author_file) {
                const result = await deleteCoverImage(author_file?.avatar.id_image)
                if (!result) {
                    return null
                }
            }
        }
        if (author.fullName) {
            const authorExist = await this.uniqueAuthor.findByName(author.fullName);

            if (authorExist && authorExist._id.toString() !== id.toString()) {
                return null;
            }
        }
        return await this.updateAuthors.updateAuthor(id, author);
    }
}
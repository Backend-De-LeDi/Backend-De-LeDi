import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { DeleteAuthor } from "../../domain/ports/deleteAuthorRepository";
import { FindAuthor } from "../../domain/ports/findAuthorRepository";

export class DeleteAuthors implements DeleteAuthor {
    constructor(private readonly deleteAuthors: DeleteAuthor,
        private readonly findAthors: FindAuthor
    ) { }
    async deleteAuthor(id: any): Promise<void> {
        const author = await this.findAthors.findById(id);
        if (!author) {
            console.warn("author not found")
            throw new Error("author not found");
        }

        if (author.avatar.id_image) {
            const deleted = await deleteCoverImage(author.avatar.id_image);
            if (!deleted) {
                console.warn(`No se pudo eliminar la imagen de Cloudinary: ${author.avatar.id_image}`);
            }
        }
        await this.deleteAuthors.deleteAuthor(id)
    }
}
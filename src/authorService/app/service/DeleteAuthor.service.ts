import { DeleteAuthor } from "../../domain/ports/deleteAuthorRepository";

export class DeleteAuthors implements DeleteAuthor {
    constructor(private readonly deleteAuthors: DeleteAuthor) { }
    async deleteAuthor(id: any): Promise<void> {
        await this.deleteAuthors.deleteAuthor(id)
    }
}

export class DeleteAuthorsSupabase implements DeleteAuthor {
    constructor(private readonly deleteAuthors: DeleteAuthor) { }
    async deleteAuthor(id: any): Promise<void> {
        await this.deleteAuthors.deleteAuthor(id)
    }
};
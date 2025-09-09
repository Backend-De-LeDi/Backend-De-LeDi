import { Author } from "../../domain/entidades/author.Types";
import { FindAuthor } from "../../domain/ports/findAuthorRepository";

export class FindAuthors {
    constructor(
        private readonly findAuthorRepository: FindAuthor
    ) { }

    async findAuthor(id: string): Promise<Author | null> {
        const author = await this.findAuthorRepository.findById(id);
        if (author) {
            return author
        }
        return null;
    }
    async findAuthorbyName(date: string): Promise<Author | null> {
        const author = await this.findAuthorRepository.findByName(date);
        if (author) {
            return author
        }
        return null;
    }
    async findAuthores(): Promise<Author[]> {
        const result = await this.findAuthorRepository.findAuthor()
        return result
    }
}

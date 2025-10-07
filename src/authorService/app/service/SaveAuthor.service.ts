import { Author } from "../../domain/entidades/author.Types";
import { FindAuthor } from "../../domain/ports/findAuthorRepository";
import { ISaveAuthorRepository } from "../../domain/ports/saveAuthorRepository";

export class CreateAuthor {
  constructor(private readonly saveAuthor: ISaveAuthorRepository, private readonly uniqueAuthor: FindAuthor) {}
  async saveAuthors(date: Author): Promise<Author> {
    const authorExist = await this.uniqueAuthor.findByName(date.fullName);
    if (authorExist) {
      throw new Error("author already in use");
    }

    const saveAuthors = await this.saveAuthor.crateAuthor(date);
    return saveAuthors;
  }
}

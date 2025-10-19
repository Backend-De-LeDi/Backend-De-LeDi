import { Author } from "../../domain/entidades/author.Types";
import { FindAuthor } from "../../domain/ports/findAuthorRepository";
import { ISaveAuthorRepository } from "../../domain/ports/saveAuthorRepository";

export class CreateAuthor {
  constructor(private readonly saveAuthor: ISaveAuthorRepository, private readonly uniqueAuthor: FindAuthor) { }
  async saveAuthors(date: Author): Promise<Author | false> {
    const authorExist = await this.uniqueAuthor.findByName(date.fullName);
    if (authorExist) {
      return false
    }

    const saveAuthorsMogo = await this.saveAuthor.createAuthor(date);
    return saveAuthorsMogo
  }
}


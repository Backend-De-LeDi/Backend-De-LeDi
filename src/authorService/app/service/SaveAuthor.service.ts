import { Author } from "../../domain/entidades/author.Types";
import { FindAuthor } from "../../domain/ports/findAuthorRepository";
import { ISaveAuthorRepository } from "../../domain/ports/saveAuthorRepository";

export class CreateAuthor {
  constructor(private readonly saveAuthor: ISaveAuthorRepository[], private readonly uniqueAuthor: FindAuthor) { }
  async saveAuthors(date: Author): Promise<(Author | (Author & number[])[])[]> {
    const authorExist = await this.uniqueAuthor.findByName(date.fullName);
    if (authorExist) {
      return [];
    }

    const saveAuthorsMogo = await this.saveAuthor[0].createAuthor(date);
    const saveAuthorsSupabase = await this.saveAuthor[1].createAuthor(saveAuthorsMogo as Author);
    return [saveAuthorsMogo, saveAuthorsSupabase] as (Author & (Author & number[])[])
  }
}

export class SaveAuthorSupabase {
  constructor(private readonly saveAuthor: ISaveAuthorRepository) { }
  async saveAuthors(date: Author): Promise<(Author | (Author & number[])[])> {
    return await this.saveAuthor.createAuthor(date)
  }
}

import { Author } from "../domain/entidades/author.Types";
import { FindAuthor } from "../domain/ports/findAuthorRepository";
import { ISaveAuthorRepository } from "../domain/ports/saveAuthorRepository";
import { UpdateAuthorRepository } from "../domain/ports/updateAuthorRepository";
import { DeleteAuthor } from "../domain/ports/deleteAuthorRepository";
import { AuthorModel } from "./models/authores.Model";
import { deleteCoverImage } from "../../shared/utils/deleteCoverImage";
import { DocumentsDrivers } from "../../ai/infrastructure/document.driver";
import { DocumentsApps } from "../../ai/applications";

const docsDriver = new DocumentsDrivers();
const docsApp = new DocumentsApps(docsDriver);

//save author on the data base
export class SaveAuthorMongoRepo implements ISaveAuthorRepository {
  async createAuthor(author: Author): Promise<Author> {
    const newAuthor = new AuthorModel(author);
    await docsApp.insertAuthor(newAuthor._id);
    return await newAuthor.save();
  }
}

//update author on the data base
export class updateAuthorMongo implements UpdateAuthorRepository {
  async updateAuthor(id: any, author: Partial<Author>) {
    const newAuthor = await AuthorModel.findByIdAndUpdate(id, author, { new: true });
    if (newAuthor) {
      return newAuthor;
    }
    return null;
  }
}

// search author on the db
export class findAuthorMongoRepo implements FindAuthor {
  async findById(id: any): Promise<Author | null> {
    const result = await AuthorModel.findById(id);
    return result;
  }
  async findByName(date: string): Promise<Author | null> {
    const result = await AuthorModel.findOne({ fullName: date });
    return result;
  }
  async findAuthor(): Promise<Author[]> {
    const result = await AuthorModel.find();
    return result;
  }
}

//repo de delete author in mongo
export class DeleteAuthorMongoRepo implements DeleteAuthor {
  async deleteAuthor(id: any): Promise<void | null> {
    const result = await AuthorModel.findById(id);
    if (!result) return null;

    if (result && result.avatar) {
      await deleteCoverImage(result.avatar.id_image);
    }
    await docsApp.deleteAuthor(result._id.toString());
    await AuthorModel.findByIdAndDelete(id);
  }
}

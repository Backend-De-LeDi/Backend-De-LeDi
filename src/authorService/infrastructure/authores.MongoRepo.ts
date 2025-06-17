import { Author } from "../domain/entidades/author.Types";
import { FindAuthor } from "../domain/ports/findAuthorRepository";
import { ISaveAuthorRepository } from "../domain/ports/saveAuthorRepository";
import { UpdateAuthorRepository } from "../domain/ports/updateAuthorRepository";
import { DeleteAuthor } from '../domain/ports/deleteAuthorRepository'
import { AuthorModel } from "./models/authores.Model";


//save author on the data base
export class SaveAuthorMongoRepo implements ISaveAuthorRepository {
    async crateAuthor(author: Author): Promise<Author> {
        const newAuthor = new AuthorModel(author)
        return await newAuthor.save()
    }
}
//update author on the data base 
export class updateAuthorMongo implements UpdateAuthorRepository {
    async updateAuthor(id: any, author: Partial<Author>) {
        const newAuthor = await AuthorModel.findByIdAndUpdate(id, author, { new: true });
        if (newAuthor) {
            return newAuthor;
        }
        return null
    }
}
// search author on the db 
export class findAuthorMongoRepo implements FindAuthor {
    async findById(id: any): Promise<Author | null> {
        const result = await AuthorModel.findById(id);
        return result
    }
    async findByName(date: string): Promise<Author | null> {
        const result = await AuthorModel.findOne({ name: date });
        return result;
    }
}

//repo de delete author in mongo
export class DeleteAuthorMongoRepo implements DeleteAuthor {
    async deleteAuthor(id: any): Promise<void> {
        await AuthorModel.findByIdAndDelete(id)
    }
}
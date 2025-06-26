import { Request, Response } from "express";
import { CreateAuthor } from "../../app/service/SaveAuthor.service";
import { ISaveAuthorRepository } from "../../domain/ports/saveAuthorRepository";
import { findAuthorMongoRepo, SaveAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";
import { Author } from "../../domain/entidades/author.Types";

const saveAuthor: ISaveAuthorRepository = new SaveAuthorMongoRepo();
const findAuthorRepo = new findAuthorMongoRepo()
const authorService = new CreateAuthor(saveAuthor, findAuthorRepo);

export const createAuthor = async (req: Request, res: Response) => {
    const author: Author = req.body;

    try {
        const result = await authorService.saveAuthors(author)
        if (!result) {
            res.status(304).json({ msg: 'the author not save' })
        }
        res.status(201).json({ msg: 'the author save successfull' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'the internal server error ' })
    }
}
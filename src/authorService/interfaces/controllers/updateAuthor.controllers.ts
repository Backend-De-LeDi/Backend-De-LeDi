import { Request, Response } from "express";
import { UpdateAuthor } from "../../app/service/UpdateAuthor.service";
import { findAuthorMongoRepo, updateAuthorMongo } from "../../infrastructure/authores.MongoRepo";
import { Author } from "../../domain/entidades/author.Types";

const updateAuthorRepo = new updateAuthorMongo();
const findAuthorRepo = new findAuthorMongoRepo()
const updataAuthor = new UpdateAuthor(updateAuthorRepo, findAuthorRepo);

export const updataAuthors = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        const newAuthor: Author = req.body
        console.log(newAuthor);

        const { id } = req.params

        const resultMongo = await updataAuthor.updateAuthor(id, newAuthor);
        if (!resultMongo) {
            res.status(302).json({ msg: "the author not update" });
            return
        }

        res.status(200).json({ msg: "author update successful" });
        return
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'internal server error' })
    }
}
import { Request, Response } from "express";
import { UpdateAuthor } from "../../app/service/UpdateAuthor.service";
import { findAuthorMongoRepo, updateAuthorMongo } from "../../infrastructure/authores.MongoRepo";
import { Author } from "../../domain/entidades/author.Types";
import { UploadService } from "../../../shared/services/uploadAvatar.service";


const updateAuthorRepo = new updateAuthorMongo();
const findAuthorRepo = new findAuthorMongoRepo()
const updataAuthor = new UpdateAuthor(updateAuthorRepo, findAuthorRepo);

export const updataAuthors = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        const newAuthor: Author = req.body
        console.log(newAuthor);

        const { id } = req.params

        if (req.file) {
            const file = req.file;
            console.log(file);

            const avatar = await UploadService.uploadAvatar(file as Express.Multer.File);
            const author = { ...newAuthor, avatar }
            const result = await updataAuthor.updateAuthor(id, author)
            res.status(200).json({ msg: "author update successful", result });

        }

        const result = await updataAuthor.updateAuthor(id, newAuthor)

        res.status(200).json({ msg: "author update successful" });
        return
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'internal server error' })
    }
}
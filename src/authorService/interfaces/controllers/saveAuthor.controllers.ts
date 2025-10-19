import { Request, Response } from "express";
import { CreateAuthor } from "../../app/service/SaveAuthor.service";
import { ISaveAuthorRepository } from "../../domain/ports/saveAuthorRepository";
import { DeleteAuthorMongoRepo, findAuthorMongoRepo, SaveAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";
import { Author } from "../../domain/entidades/author.Types";
import { UploadService } from "../../../shared/services/uploadAvatar.service";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { DeleteAuthors } from "../../app/service/DeleteAuthor.service";

const saveAuthorMongo: ISaveAuthorRepository = new SaveAuthorMongoRepo();
const findAuthorRepo = new findAuthorMongoRepo();
const deleteAuthor = new DeleteAuthors(new DeleteAuthorMongoRepo())
const authorService = new CreateAuthor(saveAuthorMongo, findAuthorRepo);

export const createAuthor = async (req: Request, res: Response) => {
  const author: Author = req.body;

  try {
    const file = req.file;

    const avatar = await UploadService.uploadAvatar(file as Express.Multer.File);
    const newAuthor = { ...author, avatar };
    const result = await authorService.saveAuthors(newAuthor);

    if (!result) {
      await deleteCoverImage(avatar.id_image);
      res.status(409).json({ msg: "the author already exist" });
      return
    }

    res.status(201).json({ msg: "the author save successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "the internal server error " });
  }
};

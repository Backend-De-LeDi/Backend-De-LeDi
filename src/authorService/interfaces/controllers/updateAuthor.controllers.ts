import { Request, Response } from "express";
import { UpdateAuthor } from "../../app/service/UpdateAuthor.service";
import { findAuthorMongoRepo, updateAuthorMongo } from "../../infrastructure/authores.MongoRepo";
import { Author } from "../../domain/entidades/author.Types";
import { UploadService } from "../../../shared/services/uploadAvatar.service";
import { authorUpdateValidation } from "../../app/validations/authorValidations";

const updateAuthorRepo = new updateAuthorMongo();
const findAuthorRepo = new findAuthorMongoRepo();
const updataAuthor = new UpdateAuthor(updateAuthorRepo, findAuthorRepo);

export const updataAuthors = async (req: Request, res: Response) => {
  try {
    const newAuthor: Author = req.body;

    const { id } = req.params;

    const parsed = authorUpdateValidation(newAuthor);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Datos de usuario inválidos",
        errors: parsed.errors.map(error => ({
          field: error.path.join('.'),
          message: error.message
        })),
        status: 400
      });
      return;
    }


    if (req.file) {
      const file = req.file;
      console.log(file);

      const avatar = await UploadService.uploadAvatar(file as Express.Multer.File);
      const author = { ...newAuthor, avatar };
      const result = await updataAuthor.updateAuthor(id, author);
      res.status(200).json({ msg: "author update successful", result });
    }

    const result = await updataAuthor.updateAuthor(id, newAuthor);
    console.log(result)
    if (!result) {
      res.status(302).json({ msg: 'the author not update' })
      return
    }

    res.status(200).json({ msg: "author update successful" });
    return;
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "internal server error" });
  }
};

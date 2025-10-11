import { Request, Response } from "express";
import { CreateAuthor } from "../../app/service/SaveAuthor.service";
import { ISaveAuthorRepository } from "../../domain/ports/saveAuthorRepository";
import { DeleteAuthorMongoRepo, findAuthorMongoRepo, SaveAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";
import { Author } from "../../domain/entidades/author.Types";
import { UploadService } from "../../../shared/services/uploadAvatar.service";
import { AuthorSupabaseRepo } from "../../infrastructure/author.supabaseRepo";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { DeleteAuthors } from "../../app/service/DeleteAuthor.service";
import { saveWritingGenreAuthor } from "../../../writinGenreAuthor/helpers/saveWritingGenre";

const saveAuthorMongo: ISaveAuthorRepository = new SaveAuthorMongoRepo();
const saveAuthorsSupabase: ISaveAuthorRepository = new AuthorSupabaseRepo()
const findAuthorRepo = new findAuthorMongoRepo();
const deleteAuthor = new DeleteAuthors(new DeleteAuthorMongoRepo())
const deleteAuthorsSupabase = new DeleteAuthors(new AuthorSupabaseRepo())
const authorService = new CreateAuthor([saveAuthorMongo, saveAuthorsSupabase], findAuthorRepo);

export const createAuthor = async (req: Request, res: Response) => {
  const author: Author = req.body;

  try {
    const file = req.file;

    const avatar = await UploadService.uploadAvatar(file as Express.Multer.File);
    const newAuthor = { ...author, avatar };
    const result = await authorService.saveAuthors(newAuthor) as (Author & (Author & number[])[])[];

    if (result.length === 0) {
      await deleteCoverImage(avatar.id_image);
      res.status(409).json({ msg: "the author already exist" });
      return
    }

    if (!result[0] || !result[1] || result[1][1].length === 0) {

      await deleteCoverImage(avatar.id_image);
      await deleteAuthor.deleteAuthor(result[0]?._id);
      await deleteAuthorsSupabase.deleteAuthor(result[1]?._id);
      res.status(304).json({ msg: "the author not save" });
      return;
    }

    const ids = result[1][1];

    try {

      await saveWritingGenreAuthor.run({ idAuthor: result[1][0]._id, idWritingGenre: ids });

    } catch (error) {
      await deleteCoverImage(avatar.id_image);
      await deleteAuthor.deleteAuthor(result[0]?._id);
      await deleteAuthorsSupabase.deleteAuthor(result[1]?._id);
      res.status(304).json({ msg: "the author not save" });
      return;
    }

    res.status(201).json({ msg: "the author save successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "the internal server error " });
  }
};

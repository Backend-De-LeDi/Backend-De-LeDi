import { Request, Response } from "express";
import { serviceContainer } from "../shader/infrastructure/serviceContainer";
import { coverImage, PropBooks } from "../../types/book.types";
import { formatter } from "../shader/utils/textFormatter";
import { BookModel } from "./model/books.model";
import { subirImagen } from "../shader/utils/uploadCorverImage";
import ContentBook from "./model/contentBookModel";
import mongoose from "mongoose";

export class ExpressController {
  async create(req: Request, res: Response): Promise<void> {
    const { title, author, descriptions, category, available, language, userId }: PropBooks = req.body;

    const files = req.files as { [key: string]: Express.Multer.File[] };

    const img = files.img[0];
    const file = files.file[0];

    console.log(file.path);
    console.log(img.path);

    if (!file) {
      res.status(400).json({ msg: "Faltan archivos de texto con el contenido del libro" });
      return;
    }
    if (!img) {
      res.status(400).json({ msg: "Faltan archivos de la portada del libro " });
      return;
    }

    const textFormat = formatter(title);
    const nameFormat = formatter(author);

    const BookExist = await BookModel.findOne({ title: textFormat, author: nameFormat });
    if (BookExist) {
      res.status(400).json({ msg: "El libro ya existe" });
      return;
    }

    const result = await subirImagen(img.path);
    if (!result) {
      res.status(400).json({ msg: "Error al subir la imagen" });
      return;
    }

    const coverImage: coverImage = {
      id_image: result.public_id,
      url_secura: result.secure_url,
    };

    const newContent = new ContentBook({ path: file.path });
    const contentId = new mongoose.Types.ObjectId(String(newContent._id));

    await serviceContainer.book.create.run(textFormat, descriptions, nameFormat, userId, category, language, available, contentId, coverImage);

    res.json({ msg: "usuario registrado correctamente" }).status(200);
  }
}

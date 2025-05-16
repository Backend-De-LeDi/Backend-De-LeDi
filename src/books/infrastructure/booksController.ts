import { Request, Response } from "express";
import { serviceContainer } from "../shader/services/serviceContainer";
import { coverImage, PropBooks } from "../../types/book.types";
import { formatter } from "../shader/utils/textFormatter";
import { BookModel } from "./model/books.model";
import { subirImagen } from "../shader/utils/uploadCorverImage";
import ContentBook from "./model/contentBookModel";
import mongoose from "mongoose";
import chalk from "chalk";
import { separator } from "../shader/utils/consoleSeparator";

export class ExpressController {
  /* 
  método para crear libros
  */

  async createBook(req: Request, res: Response): Promise<void> {
    try {
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
      const isAvailable = Boolean(available);

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
      await newContent.save();

      await serviceContainer.book.createBook.run(
        textFormat,
        descriptions,
        nameFormat,
        userId,
        category,
        language,
        isAvailable,
        contentId,
        coverImage
      );

      res.json({ msg: "libro subido correctamente" }).status(200);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: createBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      res.json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" }).status(500);
    }
  }

  /*
   método para obtener todo los libros
   */

  async getAllBook(req: Request, res: Response): Promise<void> {
    try {
      const books = await serviceContainer.book.getAllBooks.run();
      res.json(books);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getAllBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      res.json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" }).status(500);
    }
  }
}

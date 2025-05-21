import { Request, Response } from "express";
import { serviceContainer } from "../../services/serviceContainer";
import { coverImage, PropBooks, SearchedBook } from "../../types/bookTypes";
import { formatter } from "../../../shared/utils/textFormatter";
import { BookModel } from "../../infrastructure/model/books.model";
import { subirImagen } from "../../../shared/utils/uploadCorverImage";
import ContentBook from "../../infrastructure/model/contentBookModel";
import mongoose from "mongoose";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { fileDelete } from "../../../shared/utils/deleteFile";
import { sendFile } from "../../../shared/utils/sendFile";

export class ExpressController {
  //método para crear libros
  async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const { title, author, descriptions, category, available, language, userId }: PropBooks = req.body;

      const files = req.files as { [key: string]: Express.Multer.File[] };

      const img = files.img[0];
      const file = files.file[0];

      // console.log(file.path);
      // console.log(img.path);

      if (!file) return res.status(400).json({ msg: "Faltan archivos de texto con el contenido del libro" });
      if (!img) return res.status(400).json({ msg: "Faltan archivos de la portada del libro " });

      const textFormat = formatter(title);
      const nameFormat = formatter(author);
      const isAvailable = Boolean(available);

      const BookExist = await BookModel.findOne({ title: textFormat, author: nameFormat });
      if (BookExist) return res.status(409).json({ msg: "El libro ya existe" });

      const result = await subirImagen(img.path);
      if (!result) return res.status(400).json({ msg: "Error al subir la imagen" });

      const coverImage: coverImage = {
        id_image: result.public_id,
        url_secura: result.secure_url,
      };

      const isDeletingCoverImage = await fileDelete(img.path);

      if (!isDeletingCoverImage) throw new Error(`la imagen no se elimino del directorio uploads \n por favor revise esta ruta ${img.path}`);

      const newContent = new ContentBook({ path: file.path });
      const contentId = new mongoose.Types.ObjectId(String(newContent._id));
      await newContent.save();

      const pathInternal = await sendFile(newContent.path);

      await serviceContainer.book.createBook.run(
        textFormat,
        descriptions,
        nameFormat,
        userId,
        category,
        language,
        isAvailable,
        contentId,
        pathInternal.path,
        coverImage
      );

      return res.json({ msg: "libro subido correctamente" }).status(200);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: createBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" }).status(500);
    }
  }

  // método para obtener todo los libros
  async getAllBook(_req: Request, res: Response): Promise<Response> {
    try {
      const books = await serviceContainer.book.getAllBooks.run();
      return res.json(books).status(200);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getAllBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" }).status(500);
    }
  }

  // método para eliminar libro en la base de datos en base a su id que recibe por parámetro
  async deleteBook(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) return res.json({ msg: "id invalida" });

      const idValid = new mongoose.Types.ObjectId(id);

      const book: SearchedBook | null = await serviceContainer.book.getBooksById.run(idValid);
      if (!book) return res.status(404).json({ msg: "no se encontró el libro para eliminar" });

      const isDeletingCoverImage: boolean = await deleteCoverImage(book.coverImage.id_image);
      if (!isDeletingCoverImage)
        return res.status(500).json({ msg: "Ocurrió un error al eliminar la imagen en Cloudinary. Verifica si sigue existiendo." });

      const contentBook = await ContentBook.findById(book.content._id);
      if (!contentBook) return res.status(500).json({ msg: "Error al buscar el contenido del libro en la base de datos" });

      const isDeletingFiles = await fileDelete(contentBook.path);

      if (!isDeletingFiles) return res.status(500).json({ msg: "Error al eliminar el archivo del sistema. Verifica si existe en /uploads" });
      await serviceContainer.book.deleteBook.run(idValid);
      await ContentBook.findByIdAndDelete(book.content._id);

      return res.json({ msg: "libro eliminado correctamente" }).status(200);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getAllBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" }).status(500);
    }
  }

  // método para obtener un libro en la base de datos en base a su id que recibe por parámetro
  async getBookById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({ msg: "id invalida" }).status(404);
      return;
    }

    const idValid = new mongoose.Types.ObjectId(id);

    const book = await serviceContainer.book.getBooksById.run(idValid);

    if (!book) {
      res.json({ msg: "libro no encontrado" }).status(200);
      return;
    }
    res.json(book);
  }
}

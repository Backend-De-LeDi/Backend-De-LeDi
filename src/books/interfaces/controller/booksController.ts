import { Request, Response } from "express";
import { serviceContainer } from "../../services/serviceContainer";
import { PropBooks, SearchedBook } from "../../../types/bookTypes";
import { formatter } from "../../../shared/utils/textFormatter";
import { uploadCoverImagen } from "../../../shared/utils/uploadCorverImage";
import mongoose from "mongoose";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { deleteCoverImageInCloudinary } from "../../../shared/utils/deleteCoverImage";
import { fileDelete } from "../../../shared/utils/deleteFile";
import { uploadBook } from "../../../shared/utils/uploadBook";
import { deleteBookInCloudinary } from "../../../shared/utils/deleteBookInCloudinary";

export class ExpressController {
  //método para crear libros
  async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const { title, author, descriptions, category, available, language, summary }: PropBooks = req.body;

      const files = req.files as { [key: string]: Express.Multer.File[] };

      const img = files.img[0];
      const file = files.file[0];

      // console.log(file.path);
      // console.log(img.path);

      if (!file) return res.status(400).json({ msg: "Faltan archivos de texto con el contenido del libro" });
      if (!img) return res.status(400).json({ msg: "Faltan archivos de la portada del libro " });

      const titleFormat = formatter(title);
      const descriptionsFormat = formatter(descriptions);

      // console.log(titleFormat);
      // console.log(descriptionsFormat);

      const coverImage = await uploadCoverImagen(img.path);
      const content = await uploadBook(file.path);

      // console.log(coverImage);
      // console.log(content);

      if (!coverImage || !content) {
        await fileDelete(img.path);
        await fileDelete(file.path);
        return res.status(400).json({ msg: "no se pudo almacenar el contenido o la portada del libro" });
      }

      serviceContainer.book.createBook.run(
        titleFormat,
        descriptionsFormat,
        author,
        category,
        language,
        available,
        {
          idContentBook: content.public_id,
          url_secura: content.secure_url,
        },
        {
          url_secura: coverImage.secure_url,
          idCoverImage: coverImage.public_id,
        },
        summary
      );

      await fileDelete(img.path);
      await fileDelete(file.path);

      return res.json({ msg: "libro subido correctamente" }).status(200);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: createBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Error inesperado por favor intente de nuevo mas tarde" });
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

      // console.log({ id });

      if (!mongoose.Types.ObjectId.isValid(id)) return res.json({ msg: "id invalida" });

      const idValid = new mongoose.Types.ObjectId(id);

      // console.log({ idValid });

      const book: SearchedBook | null = await serviceContainer.book.getBooksById.run(idValid);
      if (!book) return res.status(404).json({ msg: "no se encontró el libro para eliminar" });

      const isDeletingCoverImage: boolean = await deleteCoverImageInCloudinary(book.coverImage.idCoverImage);
      const isDeletingBook: boolean = await deleteBookInCloudinary(book.content.idContentBook);

      if (!isDeletingCoverImage || !isDeletingBook) {
        // console.log({ isDeletingCoverImage, isDeletingBook });

        console.warn("Ocurrió un error al eliminar la documentación en Cloudinary. Verifica si siguen existiendo.");
      }

      // console.log({ isDeletingCoverImage, isDeletingBook });

      await serviceContainer.book.deleteBook.run(idValid);

      return res.json({ msg: "libro eliminado correctamente" }).status(200);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: deleteBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }

  // método para obtener un libro en la base de datos en base a su id que recibe por parámetro
  async getBookById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) return res.json({ msg: "id invalida" }).status(404);

      const idValid = new mongoose.Types.ObjectId(id);

      const book = await serviceContainer.book.getBooksById.run(idValid);

      if (!book) return res.json({ msg: "libro no encontrado" }).status(200);

      return res.json(book);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getBookById"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }

  // método para obtener un libros en la base de datos en base a la query que venga por parámetro
  async getIntelligenceBooks(req: Request, res: Response): Promise<Response> {
    try {
      const query = decodeURIComponent(req.params.query);

      const books = await serviceContainer.book.getIntelligenceBook.run(query);

      if (books.length === 0) return res.status(404).json({ msg: "no se encontró ningún libro en la búsqueda" });

      return res.status(200).json(books);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getIntelligenceBooks"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }

  // método para obtener un libros en la base de datos en base a su categoría que recibe por parámetro
  async getBookByCategory(req: Request, res: Response): Promise<Response> {
    try {
      const category = req.params.category;

      const categoryString = Array.isArray(category) ? category.join(",") : (category as string);

      const categoryArray = categoryString.split(",");

      const books = await serviceContainer.book.getBooksByCategory.run(categoryArray);

      if (books.length === 0) return res.status(404).json({ msg: "no se encontró ningún libro con esas categorías" });

      return res.status(200).json(books);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getBookByCategory"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }

  // método para obtener una url para visualizar el libro buscado por id
  async getContentBookById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "ID inválida" });
      }

      const idValid = new mongoose.Types.ObjectId(id);

      const urlContentBook = await serviceContainer.book.getContentById.run(idValid);

      if (!urlContentBook) {
        return res.status(200).json({ msg: "Libro no encontrado" });
      }

      return res.status(200).json({ urlContentBook });
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getContentBookById"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }
}

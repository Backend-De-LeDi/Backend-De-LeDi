import { Request, Response } from "express";
import { serviceContainer } from "../../../shared/services/serviceContainer";
import { PropAudiobooks, SearchedAudiobook } from "../../../shared/types/audiobookTypes/audiobookTypes";
import { uploadCoverImage } from "../../../shared/utils/uploadCoverImage";
import mongoose from "mongoose";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { fileDelete } from "../../../shared/utils/deleteFile";
import { uploadBook } from "../../../shared/utils/uploadBook";
import { deleteBookInCloudinary } from "../../../shared/utils/deleteBookInCloudinary";
import { Audiobook } from "../../domain/audiobooks";

// ? clase que se utiliza en las rutas con los métodos y caso de uso que se juntaron en contenedor de servicio
export class AudiobookController {
  // ? método para procesar y almacenar los libros que se proporcionan
  async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const { title, author, summary, subgenre, available, language, yearBook, synopsis, theme, genre, level }: PropAudiobooks = req.body;

      const files = req.files as { [key: string]: Express.Multer.File[] };

      const img = files.img[0];
      const file = files.file[0];

      const coverImage = await uploadCoverImage(img.path);
      const content = await uploadBook(file.path);

      if (!coverImage || !content) {
        await fileDelete(img.path);
        await fileDelete(file.path);

        return res.status(400).json({ msg: "no se pudo almacenar el contenido o la portada del libro" });
      }

      serviceContainer.audiobooks.createAudioBooks.run({
        title,
        summary,
        author,
        subgenre,
        language,
        available,
        contentAudiobook: {
          idContentAudiobook: content.public_id,
          url_secura: content.secure_url,
        },
        audiobookCoverImage: {
          url_secura: coverImage.secure_url,
          idAudiobookCoverImage: coverImage.public_id,
        },
        theme,
        synopsis,
        genre,
        level,
        yearBook,
        format: "Audiobook",
      });

      await fileDelete(img.path);
      await fileDelete(file.path);

      return res.status(200).json({ msg: "libro subido correctamente" });
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

  // ? método para obtener todo los libros
  async getAllBook(req: Request, res: Response): Promise<Response> {
    try {
      // * verificamos que el usuario esté autenticado
      const token = req.user;
      console.log(chalk.blue("Token del usuario autenticado: "), token);

      // * activamos el método run de contenedor que combina el caso de uso del repositorio guía
      const books = await serviceContainer.book.getAllBooks.run();

      // * si no hay libros, respondemos que no se encontraron
      return res.json(books).status(200);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getAllBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }

  // ? método para eliminar libro en la base de datos en base a su id que recibe por parámetro
  async deleteAudiobook(req: Request, res: Response): Promise<Response> {
    try {
      // * obtenemos el id del libro que se quiere eliminar
      const id = req.params.id;

      // * verificamos que el id sea válido
      if (!mongoose.Types.ObjectId.isValid(id)) return res.json({ msg: "id invalida" });

      // * convertimos el id a un objeto de tipo ObjectId de mongoose
      const idValid = new mongoose.Types.ObjectId(id);

      // * activamos el método run de contenedor que combina el caso de uso del repositorio guía
      const audiobook: SearchedAudiobook | null = await serviceContainer.audiobooks.getAudiobookById.run(idValid);

      // * si no hay libro con el id proporcionado, respondemos que no se encontró
      if (!audiobook) return res.status(404).json({ msg: "no se encontró el libro para eliminar" });

      // * eliminamos el archivo de la portada del libro en local
      const isDeletingCoverImage: boolean = await deleteCoverImage(audiobook.audiobookCoverImage.idAudiobookCoverImage);

      // * eliminamos el archivo del contenido del libro en local
      const isDeletingBook: boolean = await deleteBookInCloudinary(audiobook.audiobookContent.idContentAudiobook);

      // * eliminamos el archivo del libro en local
      if (!isDeletingCoverImage || !isDeletingBook)
        console.warn("Ocurrió un error al eliminar la documentación en Cloudinary. Verifica si siguen existiendo.");

      // * eliminamos el libro de la base de datos
      await serviceContainer.book.deleteBook.run(idValid);

      // * respondemos que se eliminó el libro correctamente
      return res.status(200).json({ msg: "libro eliminado correctamente" });
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

  // ? método para obtener un libro en la base de datos en base a su id que recibe por parámetro
  async getBookById(req: Request, res: Response): Promise<Response> {
    try {
      // * obtenemos el id del libro que se quiere buscar
      const id = req.params.id;

      // * verificamos que el id sea válido
      if (!mongoose.Types.ObjectId.isValid(id)) return res.json({ msg: "id invalida" }).status(404);

      // * convertimos el id a un objeto de tipo ObjectId de mongoose
      const idValid = new mongoose.Types.ObjectId(id);

      // * activamos el método run de contenedor que combina el caso de uso del repositorio guía
      const book = await serviceContainer.book.getBooksById.run(idValid);

      // * si no hay libro con el id proporcionado, respondemos que no se encontró
      if (!book) return res.json({ msg: "libro no encontrado" }).status(200);

      // * si hay libro con el id proporcionado, lo retornamos
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

  // ? método para obtener un libros en la base de datos en base a la query que venga por parámetro
  async getIntelligenceBooks(req: Request, res: Response): Promise<Response> {
    try {
      // * obtenemos la query de la URL, que puede ser un string o un array de strings
      const query = decodeURIComponent(req.params.query);

      // * verificamos que la query no esté vacía
      const books = await serviceContainer.book.getIntelligenceBook;

      // // * si no hay libros, respondemos que no se encontraron
      // if (books.length === 0) return res.status(404).json({ msg: "no se encontró ningún libro en la búsqueda" });

      // * si hay libros, los retornamos
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

  // ? método para obtener una url para visualizar el contenido del libro buscado por id
  async getContentBookById(req: Request, res: Response): Promise<Response> {
    try {
      // * obtenemos el id del libro que se quiere buscar
      const id = req.params.id;

      // * verificamos que el id sea válido
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "ID inválida" });

      // * convertimos el id a un objeto de tipo ObjectId de mongoose
      const idValid = new mongoose.Types.ObjectId(id);

      // * activamos el método run de contenedor que combina el caso de uso del repositorio guía
      const urlContentBook = await serviceContainer.book.getContentById.run(idValid);

      // * si no hay libro con el id proporcionado, respondemos que no se encontró
      if (!urlContentBook) return res.status(200).json({ msg: "Libro no encontrado" });

      // * si hay libro con el id proporcionado, lo retornamos
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

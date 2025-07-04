import { Response, Request } from "express";
import { serviceContainer } from "../../../shared/services/serviceContainer";
import { PropBooks } from "../../../types/bookTypes";
import { uploadAudiobookCoverImagen } from "../../../shared/utils/uploadAudiobookCoverImage";
import { uploadAudiobook } from "../../../shared/utils/uploadAudiobook";
import { fileDelete } from "../../../shared/utils/deleteFile";
import { separator } from "../../../shared/utils/consoleSeparator";
import chalk from "chalk";
import { Types } from "mongoose";
import { ContentBook } from "../../../types/contentBook";
import { deleteCoverImageInCloudinary } from "../../../shared/utils/deleteCoverImageInCloudinary";

// ? clase que contiene todo los controladores de Audiobook que se utilizaran en las rutas
export class AudiobookControllers {
  // ? método para crea un audio libro
  async createAudioBook(req: Request, res: Response): Promise<Response> {
    try {
      // * validación de que se suba un archivo de imagen y audio
      const { title, author, summary, subgenre, available, language, yearBook, synopsis, theme }: PropBooks = req.body;

      // * validación de que se suba un archivo de imagen y audio
      const files = req.files as { [key: string]: Express.Multer.File[] };

      // * validación de que se suba un archivo de imagen y audio
      const img = files.img[0];
      const audio = files.audio[0];

      // * validación de que se suba un archivo de imagen y audio
      if (!audio) return res.status(400).json({ msg: "Faltan archivos con el contenido del libro" });
      if (!img) return res.status(400).json({ msg: "Faltan archivos de la portada del libro " });

      // * validación de que se suba un archivo de imagen y audio
      const coverImageSaved = await uploadAudiobookCoverImagen(img.path);
      const audiobookSaved = await uploadAudiobook(audio.path);

      // * validación de que se suba un archivo de imagen y audio
      if (!coverImageSaved || !audiobookSaved) {
        await fileDelete(img.path);
        await fileDelete(audio.path);

        // * retorno de error si no se pudo almacenar el contenido o la portada del libro
        return res.status(400).json({ msg: "no se pudo almacenar el contenido o la portada del libro" });
      }

      // * creación del objeto de contenido y portada del libro
      const content = {
        idContentBook: audiobookSaved.public_id,
        url_secura: audiobookSaved.secure_url,
      };
      const coverImage = {
        url_secura: coverImageSaved.secure_url,
        idCoverImage: coverImageSaved.public_id,
      };

      // * usa el método que existe en el repositorio AudiobooksRepository para crear un audiolibro
      await serviceContainer.audiobooks.createAudioBooks.run(title, summary, author, subgenre, language, available, content, coverImage, synopsis, theme, yearBook);

      // * elimina la imagen y el audio del nuestro directorio temporal
      await fileDelete(img.path);
      await fileDelete(audio.path);

      // * retorno de respuesta si se pudo crear el audiolibro
      return res.status(200).json({ msg: "Audiolibro subido correctamente" });
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: createAudioBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));

      return res.status(500).json({ msg: "Error inesperado por favor intente de nuevo mas tarde" });
    }
  }

  // * método para obtener todo los libros de la base de datos en la colección de Audiobooks
  async getAllAudiobooks(req: Request, res: Response): Promise<Response> {
    try {
      const books = await serviceContainer.audiobooks.getAllAudioBooks.run();

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

  // * método que permite el la eliminación de los audio libros en la base de datos
  async deleteAudiobook(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!Types.ObjectId.isValid(id))
        return res.status(404).json({
          msg: "para eliminar un audiolibro debes ingresar una id valida",
        });

      const idFormatted = Types.ObjectId.createFromHexString(id);

      const audiobookToDelete = await serviceContainer.audiobooks.getAudiobookById.run(idFormatted);

      if (!audiobookToDelete) return res.status(404).json({ msg: "no se encontró el libro para eliminar " });

      const deletingStatus = await serviceContainer.audiobooks.deleteAudiobook.run(idFormatted);

      if (!deletingStatus)
        return res.status(500).json({
          msg: "no sea podido eliminar el Audiolibro de la base de datos",
        });

      return res.status(200).json({ msg: "Audiolibro eliminado correctamente" });
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: deleteAudiobook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" }).status(500);
    }
  }

  // * método que permite obtener Audiolibro de la base de datos
  async getAudioBookById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!Types.ObjectId.isValid(id))
        return res.status(404).json({
          msg: "para obtener un audiolibro debes ingresar una id valida",
        });

      const idFormatted = Types.ObjectId.createFromHexString(id);

      const audiobook = await serviceContainer.audiobooks.getAudiobookById.run(idFormatted);

      if (!audiobook) return res.status(404).json({ msg: "libro no encontrado" });

      return res.status(200).json(audiobook);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getAudioBookById"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" }).status(500);
    }
  }
}

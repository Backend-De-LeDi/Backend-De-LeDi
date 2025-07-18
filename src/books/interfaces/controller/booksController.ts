import { Request, Response, text } from "express";
import { serviceContainer } from "../../../shared/services/serviceContainer";
import { PropBooks, SearchedBook } from "../../../types/bookTypes";
import { uploadCoverImage } from "../../../shared/utils/uploadCoverImage";
import mongoose from "mongoose";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { deleteCoverImageInCloudinary } from "../../../shared/utils/deleteCoverImage";
import { fileDelete } from "../../../shared/utils/deleteFile";
import { uploadBook } from "../../../shared/utils/uploadBook";
import { deleteBookInCloudinary } from "../../../shared/utils/deleteBookInCloudinary";
import { UserModel } from "../../../userService/infrastructure/models/userModels";

// ? clase que se utiliza en las rutas con los métodos y caso de uso que se juntaron en contenedor de servicio
export class BookController {
  // ? método para procesar y almacenar los libros que se proporcionan
  async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const idUser = req.user.id;

      const { title, author, summary, subgenre, available, language, yearBook, synopsis, theme, genre, level }: PropBooks = req.body;

      // * recibimos los documento que son el contenido del libro
      const files = req.files as { [key: string]: Express.Multer.File[] };

      // * portada del libro
      const img = files.img[0];

      // * contenido del libro
      const file = files.file[0];

      // ! ------------------------------------------------------------------------------
      // ! cambiara manero de obtener el rol del usuario por la de jaqui
      const user = await UserModel.findById(idUser);
      if (!user) {
        // * si no se encuentra el usuario, eliminamos los archivos de portada y texto del libro en local
        await fileDelete(img.path);
        await fileDelete(file.path);

        // * respondemos que no se necesita acceso para realizar esta acción
        return res.status(404).json({ msg: "necesitas acceso para realizar esta acción" });
      }

      // ! convertimos el usuario a un objeto plano para poder acceder a sus propiedades
      const plainUser = user?.toObject();

      // ! verificamos que el usuario tenga el rol de administrador
      if (plainUser.rol !== "admin") {
        // * si el usuario no es administrador, eliminamos los archivos de portada y texto del libro en local
        await fileDelete(img.path);
        await fileDelete(file.path);

        // * respondemos que no tiene permisos para realizar esta acción
        return res.status(403).json({ msg: "No tienes permisos para realizar esta acción" });
      }
      // ! ------------------------------------------------------------------------------

      // * subimos a Cloudinary el contenido y la portada
      const content = await uploadBook(file.path);
      const coverImage = await uploadCoverImage(img.path);

      // * verificamos que se hallan subido correctamente
      if (!coverImage || !content) {
        // * si alguno de los dos no se subió los elidamos en local para no cargar el servidor
        await fileDelete(img.path);
        await fileDelete(file.path);

        // * respondemos que no se pudo almacenar el libro
        return res.status(400).json({ msg: "no se pudo almacenar el contenido o la portada del libro" });
      }

      // ejecutamos el método run del contenedor que combina el caso de uso del repositorio guía
      serviceContainer.book.createBooks.run({
        title,
        summary,
        author,
        subgenre,
        language,
        available,
        contentBook: {
          idContentBook: content.public_id,
          url_secura: content.secure_url,
        },
        bookCoverImage: {
          url_secura: coverImage.secure_url,
          idBookCoverImage: coverImage.public_id,
        },
        synopsis,
        yearBook,
        theme,
        genre,
        level,
      });

      // * una ves subido todo correctamente eliminamos los archivos de portada y texto del libro en local
      await fileDelete(img.path);
      await fileDelete(file.path);

      // * respondemos que se subió el libro correctamente
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
      const reqUser = req.user;

      if (!reqUser) {
        console.log("usuario sin autenticación se le proporcionara todos el contendió para ver pero no para leer");
        const books = await serviceContainer.book.getAllBooks.run();
        return res.status(200).json(books);
      }

      const user = await UserModel.findById(reqUser.id);

      if (!user) {
        console.log("usuario con autenticación invalida se le proporcionara todos los libros para ver pero no para leer");
        const books = await serviceContainer.book.getAllBooks.run();
        return res.status(200).json(books);
      }

      console.log("usuario autenticado en la plataforma se le proporcionara los libros en base a su nivel de lectura y para leer");

      const plainUser = user?.toObject();

      let books;
      try {
        books = await serviceContainer.book.getAllBooksByLevel.run(plainUser.nivel);
      } catch (err) {
        console.log("Error al obtener libros por nivel:", err);
        return res.status(500).json({ msg: "Error al obtener libros por nivel" });
      }

      return res.status(200).json(books);
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
  async deleteBook(req: Request, res: Response): Promise<Response> {
    try {
      // * obtenemos el id del libro que se quiere eliminar
      const id = req.params.id;

      // * verificamos que el id sea válido
      if (!mongoose.Types.ObjectId.isValid(id)) return res.json({ msg: "id invalida" });

      // * convertimos el id a un objeto de tipo ObjectId de mongoose
      const idValid = new mongoose.Types.ObjectId(id);

      // * activamos el método run de contenedor que combina el caso de uso del repositorio guía
      const book: SearchedBook | null = await serviceContainer.book.getBooksById.run(idValid);

      // * si no hay libro con el id proporcionado, respondemos que no se encontró
      if (!book) return res.status(404).json({ msg: "no se encontró el libro para eliminar" });

      // * eliminamos el archivo de la portada del libro en local
      const isDeletingCoverImage: boolean = await deleteCoverImageInCloudinary(book.bookCoverImage.idBookCoverImage);

      // * eliminamos el archivo del contenido del libro en local
      const isDeletingBook: boolean = await deleteBookInCloudinary(book.contentBook.idContentBook);

      console.log({ isDeletingBook });
      console.log({ isDeletingCoverImage });

      // * eliminamos el archivo del libro en local
      if (!isDeletingCoverImage || !isDeletingBook) console.warn("Ocurrió un error al eliminar la documentación en Cloudinary. Verifica si siguen existiendo.");

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
      const books = await serviceContainer.book.getIntelligenceBook.run(query);

      // * si no hay libros, respondemos que no se encontraron
      if (books.length === 0) return res.status(404).json({ msg: "no se encontró ningún libro en la búsqueda" });

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

  // ? método para obtener un libros en la base de datos en base a su subgénero que recibe por parámetro
  async getBookBySubgenre(req: Request, res: Response): Promise<Response> {
    try {
      // * Obtener el parámetro 'subgenre' de la URL.
      const subgenreParam = req.params.subgenre;

      // * Validar que el parámetro no esté vacío.
      if (!subgenreParam || subgenreParam.trim() === "") return res.status(400).json({ msg: "El subgénero es requerido" });

      // * Convertir el parámetro a un array de subgéneros (por si vienen separados por coma).
      const subgenreArray = subgenreParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // * Validar que haya al menos un subgénero válido.
      if (subgenreArray.length === 0) return res.status(400).json({ msg: "Debe proporcionar al menos un subgénero válido" });

      // * Consultar los libros que coincidan con los subgéneros.
      const books = await serviceContainer.book.getBooksBySubgenre.run(subgenreArray);

      // * Si no se encuentran libros, retornar mensaje.
      if (!books || books.length === 0) return res.status(404).json({ msg: "No se encontró ningún libro con esos subgéneros" });

      // * Retornar los libros encontrados.
      return res.status(200).json(books);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getBookBySubgenre"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Error inesperado, por favor intente de nuevo más tarde" });
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

  // ? método para obtener libros en base a su tema
  async getBookByTheme(req: Request, res: Response): Promise<Response> {
    try {
      // * Se obtiene el tema de la URL, que puede ser un string o un array de strings
      const theme = req.params.theme;

      // * Se divide el string en un array de temas
      const themeArray = theme.split(",");

      // * Se llama al servicio para obtener los libros por tema
      const books = await serviceContainer.book.getBookByTheme.run(themeArray);

      // * Si no se encuentran libros, se retorna un mensaje de error
      if (books.length === 0) return res.status(404).json({ msg: "No se encontraron libros con ese tema" });

      // * Si se encuentran libros, se retornan
      return res.status(200).json(books);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getBookByTheme"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }
}

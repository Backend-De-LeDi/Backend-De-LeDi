import { Request, Response, text } from "express";
import { serviceContainer } from "../../../shared/services/serviceContainer";
import { PropBooks, SearchedBook } from "../../../shared/types/bookTypes/bookTypes";
import { uploadCoverImage } from "../../../shared/utils/uploadCoverImage";
import mongoose, { Types } from "mongoose";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { fileDelete } from "../../../shared/utils/deleteFile";
import { uploadBook } from "../../../shared/utils/uploadBook";
import { deleteBookInCloudinary } from "../../../shared/utils/deleteBookInCloudinary";
import { UserModel } from "../../../userService/infrastructure/models/userModels";
import { ContentBook } from "../../../shared/types/bookTypes/contentBookTypes";
import { BookCoverImage } from "../../../shared/types/bookTypes/bookTypes";
import { token } from "../../../shared/types/IToken";

export class BookController {
  // ✅
  async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const idUser = req.user.id;

      const { title, author, summary, subgenre, available, language, yearBook, synopsis, theme, genre, level, format, totalPages, duration, fileExtension }: PropBooks = req.body;

      const files = req.files as {
        [key: string]: Express.Multer.File[];
      };

      const img = files.img[0];
      const file = files.file[0];

      const user = await UserModel.findById(idUser);
      if (!user) {
        await fileDelete(img.path);
        await fileDelete(file.path);

        return res.status(404).json({ msg: "necesitas acceso para realizar esta acción" });
      }

      const plainUser = user.toObject();

      if (plainUser.rol.toLowerCase() !== "admin") {
        await fileDelete(img.path);
        await fileDelete(file.path);

        return res.status(403).json({ msg: "No tienes permisos para realizar esta acción" });
      }

      const content = await uploadBook(file.path);
      const coverImage = await uploadCoverImage(img.path);

      if (!coverImage || !content) {
        await fileDelete(img.path);
        await fileDelete(file.path);
        if (coverImage && coverImage.public_id !== undefined) await deleteCoverImage(coverImage.public_id);
        if (content && content.public_id !== undefined) await deleteBookInCloudinary(content.public_id);
        return res.status(400).json({ msg: "no se pudo almacenar el contenido o la portada del libro" });
      }

      const newBook = {
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
        format,
        fileExtension,
        totalPages,
        duration,
      };

      serviceContainer.book.createBooks.run(newBook);

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
      return res.status(500).json({
        msg: "Error inesperado por favor intente de nuevo mas tarde",
      });
    }
  }

  // ✅
  async getAllBook(req: Request, res: Response): Promise<Response> {
    try {
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
        return res.status(500).json({
          msg: "Error al obtener libros por nivel",
        });
      }

      return res.status(200).json(books);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getAllBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({
        msg: "Erro inesperado por favor intente de nuevo mas tarde",
      });
    }
  }

  // ✅
  async deleteBook(req: Request, res: Response): Promise<Response> {
    try {
      const idUser = req.user.id;

      const user = await UserModel.findById(idUser);

      if (!user) return res.status(404).json({ msg: "debes iniciar session en la plataforma para obtener acceso a esta acción" });

      const plainUser = user?.toObject();

      if (plainUser.rol.toLocaleLowerCase() !== "admin") return res.status(403).json({ msg: "No tienes permisos para realizar esta acción" });

      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) return res.json({ msg: "id invalida" });

      const idValid = new mongoose.Types.ObjectId(id);

      const book: SearchedBook | null = await serviceContainer.book.getBooksById.run(idValid);

      if (!book) return res.status(404).json({ msg: "no se encontró el libro para eliminar" });

      const isDeletingCoverImage: boolean = await deleteCoverImage(book.bookCoverImage.idBookCoverImage);

      const isDeletingBook: boolean = await deleteBookInCloudinary(book.contentBook.idContentBook);

      if (!isDeletingCoverImage || !isDeletingBook) console.warn("Ocurrió un error al eliminar la documentación en Cloudinary. Verifica si siguen existiendo.");

      await serviceContainer.book.deleteBook.run(idValid);

      return res.status(200).json({ msg: "libro eliminado correctamente" });
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: deleteBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({
        msg: "Erro inesperado por favor intente de nuevo mas tarde",
      });
    }
  }

  //✅
  async updateBookById(req: Request, res: Response): Promise<Response> {
    try {
      const idUser = req.user.id;

      const id = req.params.id;

      const { title, author, summary, subgenre, available, language, yearBook, synopsis, theme, genre, level, format, totalPages, duration, fileExtension }: PropBooks = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "id invalida" });
      const idValid = new mongoose.Types.ObjectId(id);

      const user = await UserModel.findById(idUser);
      if (!user) return res.status(404).json({ msg: "debes iniciar session en la plataforma para obtener acceso a esta acción" });

      const plainUser = user.toObject();
      if (plainUser.rol.toLocaleLowerCase() !== "admin") return res.status(403).json({ msg: "No tienes permisos para realizar esta acción" });

      const existingBook: SearchedBook | null = await serviceContainer.book.getBooksById.run(idValid);

      if (!existingBook) return res.status(404).json({ msg: "no se encontró el libro para actualizar" });

      const files = req.files as {
        [key: string]: Express.Multer.File[];
      };

      let coverImage: BookCoverImage = existingBook.bookCoverImage;
      let contentBook: ContentBook = existingBook.contentBook;

      if (files && files.img && files.img.length > 0) {
        const img = files.img[0];
        const newCoverImage = await uploadCoverImage(img.path);

        if (newCoverImage) {
          const isDeletingCoverImage: boolean = await deleteCoverImage(existingBook.bookCoverImage.idBookCoverImage);

          if (!isDeletingCoverImage) console.warn("Ocurrió un error al eliminar la portada en Cloudinary. Verifica si sigue existiendo.");

          coverImage = {
            url_secura: newCoverImage.secure_url,
            idBookCoverImage: newCoverImage.public_id,
          };
        }

        await fileDelete(img.path);
      }

      if (files && files.file && files.file.length > 0) {
        const file = files.file[0];

        const newContent = await uploadBook(file.path);

        if (newContent) {
          const isDeletingBook: boolean = await deleteBookInCloudinary(existingBook.contentBook.idContentBook);

          if (!isDeletingBook) console.warn("Ocurrió un error al eliminar el libro en Cloudinary. Verifica si sigue existiendo.");

          contentBook = {
            idContentBook: newContent.public_id,
            url_secura: newContent.secure_url,
          };
        }
        await fileDelete(file.path);
      }

      const updatedBook = {
        _id: existingBook._id,
        title: title || existingBook.title,
        author: author || existingBook.author,
        summary: summary || existingBook.summary,
        subgenre: subgenre || existingBook.subgenre,
        available: available !== undefined ? available : existingBook.available,
        language: language || existingBook.language,
        yearBook: yearBook || existingBook.yearBook,
        synopsis: synopsis || existingBook.synopsis,
        theme: theme || existingBook.theme,
        genre: genre || existingBook.genre,
        level: level || existingBook.level,
        format: format || existingBook.format,
        totalPages: totalPages || existingBook.totalPages,
        duration: duration || existingBook.duration,
        fileExtension: fileExtension || existingBook.fileExtension,
        bookCoverImage: coverImage || existingBook.bookCoverImage,
        contentBook: contentBook || existingBook.contentBook,
      };

      await serviceContainer.book.updateBooksById.run(idValid, updatedBook);

      return res.status(200).json({ msg: "libro actualizado correctamente" });
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: updateBook"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Error inesperado por favor intente de nuevo mas tarde" });
    }
  }

  // ✅
  async getBookById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "id invalida" });

      const idValid = new mongoose.Types.ObjectId(id);

      const book = await serviceContainer.book.getBooksById.run(idValid);

      if (!book) return res.status(200).json({ msg: "libro no encontrado" });

      return res.json(book);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getBookById"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({
        msg: "Erro inesperado por favor intente de nuevo mas tarde",
      });
    }
  }

  // ✅
  async getIntelligenceBooks(req: Request, res: Response): Promise<Response> {
    try {
      const idUser = req.user.id;

      const user = await UserModel.findById(idUser);

      if (!user) return res.status(404).json({ msg: "debes iniciar session en la plataforma para obtener acceso a esta acción" });

      const query = decodeURIComponent(req.params.query);

      const books = await serviceContainer.book.getIntelligenceBook.run(query.split(" "));

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

  // ✅
  async getContentBookById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "ID inválida" });

      const idValid = new mongoose.Types.ObjectId(id);

      const urlContentBook = await serviceContainer.book.getContentById.run(idValid);

      if (!urlContentBook) return res.status(200).json({ msg: "Libro no encontrado" });

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

  // ✅
  async getBookByAuthorId(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "ID inválida" });

      const idValid = new mongoose.Types.ObjectId(id);

      const books = await serviceContainer.book.getBookByAuthorId.run(idValid);

      return res.status(200).json(books);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getBookByAuthorId"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }

  // ✅
  async getBooksByFiltering(req: Request, res: Response): Promise<Response> {
    const idUser = req.user.id;
    if (!Types.ObjectId.isValid(idUser)) return res.status(400).json({ msg: "credenciales de usuairo invalida" });

    const idValid = new Types.ObjectId(idUser as string);

    const user = await UserModel.findById(idValid);

    const plainUser = user?.toObject();

    const { theme, subgenre, yearBook, genre, format }: { theme: string[]; subgenre: string[]; yearBook: string[]; genre: string[]; format: string[] } = req.body;
    const books = await serviceContainer.book.getBooksByFiltering.run(theme, subgenre, yearBook, genre, format, plainUser?.nivel);
    console.log(books.length);

    return res.status(200).json(books);
  }

  // ✅
  async getAllThemes(_req: Request, res: Response): Promise<Response> {
    const themes = await serviceContainer.book.getAllThemes.run();
    return res.status(200).json(themes);
  }

  // ✅
  async getAllSubgenres(_req: Request, res: Response): Promise<Response> {
    const subgenres = await serviceContainer.book.getAllSubgenres.run();
    return res.status(200).json(subgenres);
  }

  // ✅
  async getAllGenres(_req: Request, res: Response): Promise<Response> {
    const genres = await serviceContainer.book.getAllGenres.run();
    return res.status(200).json(genres);
  }

  // ✅
  async getAllYears(_req: Request, res: Response): Promise<Response> {
    const years = await serviceContainer.book.getAllYears.run();
    return res.status(200).json(years);
  }

  // ✅
  async getAllFormats(_req: Request, res: Response): Promise<Response> {
    const formats = await serviceContainer.book.getAllFormats.run();
    return res.status(200).json(formats);
  }

  // ✅
  async getBookByProgress(req: Request, res: Response): Promise<Response> {
    try {
      const token: token = req.user;

      const idValid = new Types.ObjectId(token.id);

      const progress: any = await serviceContainer.progress.findProgres.findByUser(idValid);

      const idMap = new Map<string, Types.ObjectId>();

      for (const doc of progress) {
        const idStr = doc.idBook.toString();
        if (!idMap.has(idStr)) idMap.set(idStr, doc.idBook);
      }

      const bookIds: Types.ObjectId[] = Array.from(idMap.values());

      const book = await serviceContainer.book.getBooksByIds.run(bookIds);

      return res.status(200).json(book);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getBookByProgress"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Erro inesperado por favor intente de nuevo mas tarde" });
    }
  }
}

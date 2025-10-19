import { GetIntelligenceBook, GetContentBookById, GetAllBooksByLevel, GetBooksByFiltering, GetBooksByIds } from "../../application";
import { MongoQueryRepository } from "../../infrastructure/mongo";
import { Request, Response } from "express";
import { UserModel } from "../../../userService/infrastructure/models/userModels";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { token } from "../../../shared/types/IToken";
import { FindProgressMongo } from "../../../userPogressBooks/infrastructure/bookProgressRepoMongo";
import { FindProgresByID } from "../../../userPogressBooks/aplication/service/FindById.Service";

const mongoQueyRepo = new MongoQueryRepository();
const progressRepository = new FindProgressMongo();

const getIntelligenceService = new GetIntelligenceBook(mongoQueyRepo);
const getContentService = new GetContentBookById(mongoQueyRepo);
const getForFilteringService = new GetBooksByFiltering(mongoQueyRepo);
const getByIdsService = new GetBooksByIds(mongoQueyRepo);
const findProgresByIdService = new FindProgresByID(progressRepository)


export class BooksQueryController {

     // ✅
     async getIntelligenceBooks(req: Request, res: Response): Promise<Response> {
          try {
               const idUser = req.user.id;

               const user = await UserModel.findById(idUser);

               if (!user) return res.status(404).json({ msg: "debes iniciar session en la plataforma para obtener acceso a esta acción" });

               const query = decodeURIComponent(req.params.query);

               const books = await getIntelligenceService.run(query.split(" "));

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

               const urlContentBook = await getContentService.run(idValid);

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
     async getBooksByFiltering(req: Request, res: Response): Promise<Response> {
          const idUser = req.user.id;
          if (!Types.ObjectId.isValid(idUser)) return res.status(400).json({ msg: "credenciales de usuairo invalida" });

          const idValid = new Types.ObjectId(idUser as string);

          const user = await UserModel.findById(idValid);

          const plainUser = user?.toObject();

          const { theme, subgenre, yearBook, genre, format }: { theme: string[]; subgenre: string[]; yearBook: string[]; genre: string[]; format: string[] } = req.body;
          const books = await getForFilteringService.run(theme, subgenre, yearBook, genre, format, plainUser?.nivel);
          console.log(books.length);

          return res.status(200).json(books);
     }

     // ✅
     async getBookByProgress(req: Request, res: Response): Promise<Response> {
          try {
               const token: token = req.user;

               const idValid = new Types.ObjectId(token.id);

               const progress: any = await findProgresByIdService.findByUser(idValid);

               const idMap = new Map<string, Types.ObjectId>();

               for (const doc of progress) {
                    const idStr = doc.idBook.toString();
                    if (!idMap.has(idStr)) idMap.set(idStr, doc.idBook);
               }

               const bookIds: Types.ObjectId[] = Array.from(idMap.values());

               const book = await getByIdsService.run(bookIds);

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
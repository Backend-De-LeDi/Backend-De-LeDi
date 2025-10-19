import { Request, Response } from "express";
import mongoose from "mongoose";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { MongoAuthorRepository } from "../../infrastructure/mongo";
import { GetBookByAuthorId } from "../../application";

const mongoAuthorRepo = new MongoAuthorRepository()
const getByAuthorService = new GetBookByAuthorId(mongoAuthorRepo)

export class BookForAuthorController {
     async getBookByAuthorId(req: Request, res: Response): Promise<Response> {
          try {
               const id = req.params.id;

               if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "ID inválida" });

               const idValid = new mongoose.Types.ObjectId(id);

               const books = await getByAuthorService.run(idValid);

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
}
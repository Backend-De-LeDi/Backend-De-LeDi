import type { Request, Response } from "express";
import { Gamble } from "../../../shared/types/gamesTypes/createYourHistory";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { ConnectionAI } from "../../infrastructure/serviceOfAI";
import { GetCreateYourHistoryGame } from "../../applications/games/getCreateYourHistoryGame";
import { GetQuiz } from "../../applications/games/getQuiz";
import { Quiz } from "../../../shared/types/gamesTypes/createYourHistory";
import { Types } from "mongoose";
import { TempData } from "../../infrastructure/model/tempData";
import { UserModel } from "../../../userService/infrastructure/models/userModels";
import { UtilsGames } from "../../../shared/utils/games/utilsGames";

const aiRepository = new ConnectionAI();
const getCreateYourHistoryGame = new GetCreateYourHistoryGame(aiRepository);
const getQuiz = new GetQuiz(aiRepository);

interface Option {
  textOption: string;
  score: number;
}

interface Event {
  title: string;
  scenary: string;
  page: number;
  options?: Option[];
  completed?: boolean;
}

interface Option {
  textOption: string;
  score: number;
}
interface TempDoc {
  idBook: string;
  idUser: string;
  options: Option[];
  total: number;
}

export class AIControlles {

  gamble: Gamble | undefined;

  async getGameCreateYourHistory(req: Request, res: Response): Promise<Response> {
    try {
      const idBooks: string = req.params.id;
      const userId = req.user?.id;

      if (!Types.ObjectId.isValid(idBooks)) return res.status(400).json({ msg: "id invalida" });

      if (UtilsGames.isValidGamblePayload(req.body)) this.gamble = UtilsGames.buildGambleFromPayload(req.body);


      const response: Event = await getCreateYourHistoryGame.run(idBooks, this.gamble);

      // preparar update
      const update: any = {
        $set: {
          title: response.title,
          scenary: response.scenary,
          page: response.page,
        },
        $setOnInsert: { idBook: idBooks, idUser: userId },
      };

      // si hay opciones nuevas
      if (response.options) {
        update.$addToSet = { options: { $each: response.options } };
      }

      // si el usuario eligió una opción, sumar score
      if (this.gamble?.option) {
        const tempDoc = await TempData.findOne({ idBook: idBooks, idUser: userId }).lean<TempDoc>();
        const chosen = tempDoc?.options.find((opt) => opt.textOption === this.gamble!.option);
        if (chosen) {
          update.$inc = { total: chosen.score };
        }
      }

      await TempData.findOneAndUpdate({ idBook: idBooks, idUser: userId }, update, { upsert: true, new: true });

      if (response.options) {
        return res.status(200).json({
          ...response,
          options: response.options.map(({ score, ...rest }) => rest),
        });
      }

      if (response.completed) {
        // Buscar el acumulado en TempData
        const tempDoc = await TempData.findOne({ idBook: idBooks, idUser: userId }).lean<{ _id: Types.ObjectId, total: number }>();

        if (tempDoc) {
          await UserModel.findByIdAndUpdate(
            userId,
            { $inc: { point: tempDoc.total } }, // suma el total acumulado
            { new: true }
          );
          await TempData.findByIdAndDelete(tempDoc._id)
        }

        await TempData.deleteOne({ idBook: idBooks, idUser: userId });

        return res.status(200).json({ ...response, score: tempDoc?.total });
      }
      return res.status(200).json();
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getGameCreateYourHistory"));
      console.log(chalk.yellow(separator()));
      console.log(error);
      console.log(chalk.yellow(separator()));
      return res.status(500).json({
        msg: "Error inesperado por favor intente de nuevo mas tarde",
      });
    }
  }

  async getQuiz(req: Request, res: Response): Promise<Response> {
    try {
      const idBook: string = req.params.id;

      if (!Types.ObjectId.isValid(idBook)) return res.status(400).json({ msg: "id invalida" });
      let quiz: Quiz | undefined;

      if (
        req.body &&
        req.body.title !== undefined &&
        req.body.ecenary !== undefined &&
        req.body.page !== undefined &&
        req.body.options !== undefined
      ) {
        quiz = {
          title: req.body.title,
          scenery: req.body.ecenary,
          page: req.body.page,
          options: req.body.options,
          score: 0,
        };
      } else {
        quiz = undefined;
      }

      const response: any = await getQuiz.run(idBook, quiz);
      return res.status(200).json(response);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getQuiz"));
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
}
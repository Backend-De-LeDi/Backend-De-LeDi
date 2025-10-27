import type { Request, Response } from "express";
import { Gamble } from "../../../shared/types/gamesTypes/gameTypes";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { Quiz } from "../../../shared/types/gamesTypes/gameTypes";
import { Types } from "mongoose";
import { TempHistoryGame } from "../../infrastructure/model/tempHistoryGame";
import { UserModel } from "../../../userService/infrastructure/models/userModels";
import { UtilsGames } from "../../../shared/utils/games/utilsGames";
import { ResGame, tempGamble } from "../../../shared/types/gamesTypes/gameTypes";
import { GameDriver } from "../../infrastructure/game.driver";
import { GameApps } from "../../applications";

const gameDriver = new GameDriver();
const gameApp = new GameApps(gameDriver);

export class GameControllers {
  gambleHistory: Gamble | undefined;
  gambleQuiz: Gamble | undefined;

  async getGameCreateYourHistory(req: Request, res: Response): Promise<Response> {
    try {
      const idBooks: string = req.params.id;
      const userId = req.user?.id;

      if (!Types.ObjectId.isValid(idBooks)) return res.status(400).json({ msg: "id invalida" });

      if (UtilsGames.isValidGamblePayload(req.body)) this.gambleHistory = UtilsGames.buildGambleFromPayload(req.body);

      const response: ResGame = await gameApp.createYourHistoryGame(idBooks, this.gambleHistory);

      // preparar update
      const update: any = {
        $set: {
          title: response.title,
          scenery: response.scenery,
          page: response.page,
        },
        $setOnInsert: { idBook: idBooks, idUser: userId },
      };

      // si hay opciones nuevas
      if (response.options) {
        update.$addToSet = { options: { $each: response.options } };
      }

      // si el usuario eligió una opción, sumar score
      if (this.gambleHistory?.option) {
        const tempDoc = await TempHistoryGame.findOne({ idBook: idBooks, idUser: userId }).lean<tempGamble>();
        const chosen = tempDoc?.options.find((opt) => opt.textOption === this.gambleHistory!.option);
        if (chosen) {
          update.$inc = { total: chosen.score };
        }
      }

      await TempHistoryGame.findOneAndUpdate({ idBook: idBooks, idUser: userId }, update, { upsert: true, new: true });

      if (response.options) {
        return res.status(200).json({
          ...response,
          options: response.options.map(({ score, ...rest }) => rest),
        });
      }

      if (response.completed) {
        // Buscar el acumulado en TempData
        const tempDoc = await TempHistoryGame.findOne({ idBook: idBooks, idUser: userId }).lean<{
          _id: Types.ObjectId;
          total: number;
        }>();

        if (tempDoc) {
          await UserModel.findByIdAndUpdate(
            userId,
            { $inc: { point: tempDoc.total } }, // suma el total acumulado
            { new: true }
          );
          await TempHistoryGame.findByIdAndDelete(tempDoc._id);
        }

        await TempHistoryGame.deleteOne({ idBook: idBooks, idUser: userId });

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

      if (UtilsGames.isValidGamblePayload(req.body)) this.gambleHistory = UtilsGames.buildGambleFromPayload(req.body);

      const response: any = await gameApp.quiz(idBook, quiz);
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

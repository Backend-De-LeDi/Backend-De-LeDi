import type { Request, Response } from "express";
import { Gamble, ResGameHistory, ResGameHistoryFinal } from "../../../shared/types/gamesTypes/gameTypes";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { Quiz } from "../../../shared/types/gamesTypes/gameTypes";
import { Types } from "mongoose";
import { TempHistoryGame } from "../../infrastructure/model/tempHistoryGame";
import { UserModel } from "../../../userService/infrastructure/models/userModels";
import { UtilsGames } from "../../../shared/utils/games/utilsGames";
import { ResGameQuiz, ResGameQuizFinal, tempGamble } from "../../../shared/types/gamesTypes/gameTypes";
import { GameDriver } from "../../infrastructure/game.driver";
import { GameApps } from "../../applications";
import { TempQuizGame } from "../../infrastructure/model/tempQuizGame";

const gameDriver = new GameDriver();
const gameApp = new GameApps(gameDriver);

export class GameControllers {
  gambleHistory: Gamble | undefined;
  gambleQuiz: Quiz | undefined;

  async getGameCreateYourHistory(req: Request, res: Response): Promise<Response> {
    try {
      const idBooks: string = req.params.id;
      const userId = req.user?.id;

      if (!Types.ObjectId.isValid(idBooks)) return res.status(400).json({ msg: "id invalida" });

      if (UtilsGames.isValidGamblePayload(req.body)) this.gambleHistory = UtilsGames.buildGambleFromPayload(req.body);

      const response: ResGameHistory | ResGameHistoryFinal | null = await gameApp.createYourHistoryGame(idBooks, this.gambleHistory);

      if (response === null) return res.status(400).json({ msg: "no se pudo crear los ecenarios porfavor intente de nuevo " })


      const update: any = {
        $set: {
          title: response.title,
          scenery: response.scenery,
          page: response.page,
        },
        $setOnInsert: { idBook: idBooks, idUser: userId },
      };

      if (this.gambleHistory?.option) {
        const tempDoc = await TempHistoryGame.findOne({ idBook: idBooks, idUser: userId }).lean<tempGamble>();
        const chosen = tempDoc?.options.find(opt => opt.textOption === this.gambleHistory!.option);
        if (chosen) {
          update.$inc = { total: chosen.score };
        }
      }


      if (UtilsGames.isHistory(response)) {
        update.$addToSet = {
          options: { $each: response.options },
        };

        await TempHistoryGame.findOneAndUpdate(
          { idBook: idBooks, idUser: userId },
          update,
          { upsert: true, new: true }
        );

        this.gambleHistory = undefined

        return res.status(200).json({
          ...response,
          options: response.options.map(({ score, ...rest }) => rest),
        });
      }



      if (UtilsGames.isFinal(response)) {
        await TempHistoryGame.findOneAndUpdate({ idBook: idBooks, idUser: userId }, update, { upsert: true, new: true });

        const tempDoc = await TempHistoryGame.findOne({ idBook: idBooks, idUser: userId }).lean<{ _id: Types.ObjectId; total: number }>();

        if (tempDoc) {
          await UserModel.findByIdAndUpdate(userId, { $inc: { point: tempDoc.total } }, { new: true });
          await TempHistoryGame.findByIdAndDelete(tempDoc._id);
        }

        await TempHistoryGame.deleteOne({ idBook: idBooks, idUser: userId });

        this.gambleHistory = undefined;

        return res.status(200).json({ ...response, score: tempDoc?.total, });
      }


      return res.status(200).json();

    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getGameCreateYourHistory"));
      console.log(chalk.yellow(separator()));
      console.log(error);
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Error inesperado por favor intente de nuevo mas tarde", });
    }
  }

  async getQuiz(req: Request, res: Response): Promise<Response> {
    try {
      const idBook: string = req.params.id;
      const userId = req.user?.id;

      if (!Types.ObjectId.isValid(idBook)) {
        return res.status(400).json({ msg: "id invalida" });
      }

      if (UtilsGames.isValidGamblePayload(req.body)) {
        this.gambleQuiz = UtilsGames.buildQuizFromPayload(req.body);
      }

      const response: ResGameQuiz | ResGameQuizFinal | null =
        await gameApp.quiz(idBook, this.gambleQuiz);

      if (response === null) {
        return res.status(400).json({ msg: "no se pudo generar los ecenarios intente nuevamente" });
      }

      if (UtilsGames.isQuizActive(response)) {
        const update: any = {
          $set: {
            title: response.title,
            scenery: response.scenery,
            page: response.page,
          },
          $setOnInsert: {
            idBook,
            idUser: userId,
          },
        };

        if (this.gambleQuiz?.option) {
          const tempDoc = await TempQuizGame.findOne({ idBook, idUser: userId }).lean<{ options: { textOption: string; score: number }[] }>();
          const matched = tempDoc?.options.find(opt => opt.textOption === this.gambleQuiz!.option.text);

          if (matched) {
            const delta = this.gambleQuiz!.option.status ? matched.score : -matched.score;
            update.$inc = { total: delta };
            update.$push = {
              chosenOptions: {
                textOption: matched.textOption,
                score: delta,
              },
            };
          }
        }

        update.$addToSet = { options: { $each: response.options.map(opt => ({ textOption: opt.textOption, score: opt.score, })), }, };

        await TempQuizGame.findOneAndUpdate({ idBook, idUser: userId }, update, { upsert: true, new: true });
        this.gambleQuiz = undefined;
        return res.status(200).json({ ...response, options: response.options.map(({ status, textOption }) => ({ status, textOption })), });
      }

      if (UtilsGames.isQuizFinal(response)) {
        const update: any = {
          $set: {
            title: response.title,
            scenery: "",
            page: 0,
          },
          $setOnInsert: {
            idBook,
            idUser: userId,
          },
        };

        if (this.gambleQuiz?.option) {
          const tempDoc = await TempQuizGame.findOne({ idBook, idUser: userId }).lean<{ options: { textOption: string; score: number }[] }>();
          const matched = tempDoc?.options.find(opt => opt.textOption === this.gambleQuiz!.option.text);

          if (matched) {
            const delta = this.gambleQuiz!.option.status ? matched.score : -matched.score;
            update.$inc = { total: delta };
            update.$push = {
              chosenOptions: {
                textOption: matched.textOption,
                score: delta,
              },
            };
          }
        }

        await TempQuizGame.findOneAndUpdate(
          { idBook, idUser: userId },
          update,
          { upsert: true, new: true }
        );

        const tempDoc = await TempQuizGame.findOne({ idBook, idUser: userId }).lean<{ _id: Types.ObjectId; total: number }>();

        if (tempDoc) {
          await UserModel.findByIdAndUpdate(
            userId,
            { $inc: { point: tempDoc.total } },
            { new: true }
          );
          await TempQuizGame.findByIdAndDelete(tempDoc._id);
        }

        await TempQuizGame.deleteOne({ idBook, idUser: userId });

        this.gambleQuiz = undefined;

        return res.status(200).json({ ...response, score: tempDoc?.total });
      }

      return res.status(200).json();
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getQuiz"));
      console.log(chalk.yellow(separator()));
      console.log(error);
      console.log(chalk.yellow(separator()));
      return res.status(500).json({ msg: "Error inesperado por favor intente de nuevo mas tarde" });
    }
  }
}

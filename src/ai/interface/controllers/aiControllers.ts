import type { Request, Response } from "express";
import { Gamble } from "../../../shared/types/gamesTypes/createYourHistory";
import chalk from "chalk";
import { separator } from "../../../shared/utils/consoleSeparator";
import { ConnectionAI } from "../../infrastructure/serviceOfAI";
import { GetCreateYourHistoryGame } from "../../applications/games/getCreateYourHistoryGame";
import { GetQuiz } from "../../applications/games/getQuiz";
import { Types } from "mongoose";
import { Quiz } from "../../../shared/types/gamesTypes/createYourHistory";

const aiRepository = new ConnectionAI();
const getCreateYourHistoryGame = new GetCreateYourHistoryGame(aiRepository);
const getQuiz = new GetQuiz(aiRepository);

export class AIControlles {
  async getGameCreateYourHistory(req: Request, res: Response): Promise<Response> {
    try {
      const idsBooks: string = req.params.id;

      if (!Types.ObjectId.isValid(idsBooks)) return res.status(400).json({ msg: "id invalida" });

      let gamble: Gamble | undefined;

      if (req.body && req.body.title !== undefined && req.body.ecenary !== undefined && req.body.page !== undefined && req.body.option !== undefined) {
        gamble = {
          title: req.body.title,
          ecenary: req.body.ecenary,
          page: req.body.page,
          option: req.body.option,
        };
      } else {
        gamble = undefined;
      }

      const response: any = await getCreateYourHistoryGame.run(idsBooks, gamble);

      return res.status(200).json(response);
    } catch (error) {
      console.log(chalk.yellow("Error en el controlador: getGameCreateYourHistory"));
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

  async getQuiz(req: Request, res: Response): Promise<Response> {
    try {
      const idBook: string = req.params.id;

      if (!Types.ObjectId.isValid(idBook)) return res.status(400).json({ msg: "id invalida" });
      let quiz: Quiz | undefined;

      if (req.body && req.body.title !== undefined && req.body.ecenary !== undefined && req.body.page !== undefined && req.body.options !== undefined) {
        quiz = {
          title: req.body.title,
          ecenary: req.body.ecenary,
          page: req.body.page,
          options: req.body.options,
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

  // async chatBot(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { idSession, message }: IDataChatBot = req.body;

  //     if (!Types.ObjectId.isValid(req.user.id)) return res.status(400).json({ msg: "id invalida" });

  //     const idUserValid = new Types.ObjectId(req.user.id as string);

  //     const chat = new VectorStoreMemory(idUserValid, idSession, "user", message);

  //     await serviceContainer.ai.createVectorStoreMemory.run(chat);

  //     const chatResponse = await serviceContainer.ai.chatBot.run(message);

  //     const chatAI = new VectorStoreMemory(idUserValid, idSession, "ai", chatResponse);

  //     await serviceContainer.ai.createVectorStoreMemory.run(chatAI);

  //     return res.status(202).json({ msg: chatResponse });
  //   } catch (error) {
  //     console.log(chalk.yellow("Error en el controlador: chatBot"));
  //     console.log(chalk.yellow(separator()));
  //     console.log();
  //     console.log(error);
  //     console.log();
  //     console.log(chalk.yellow(separator()));
  //     return res.status(500).json({
  //       msg: "Error inesperado por favor intente de nuevo mas tarde",
  //     });
  //   }
  // }
}

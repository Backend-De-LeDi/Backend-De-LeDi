import { Types } from "mongoose";
import { serviceContainer } from "../../../shared/services/serviceContainer";
import type { Request, Response } from "express";
import { Gamble } from "../../../shared/types/createYourHistory/createYourHistory";

export class AIControlles {
     async getGameCreateYourHistory(req: Request, res: Response): Promise<any> {
          const idsBooks: string = req.params.id;

          if (!Types.ObjectId.isValid(idsBooks)) {
               return res.status(400).json({ msg: "id invalida" });
          }

          let gamble: Gamble | undefined;

          if (
               req.body &&
               req.body.title !== undefined &&
               req.body.ecenary !== undefined &&
               req.body.page !== undefined &&
               req.body.option !== undefined
          ) {
               gamble = {
                    title: req.body.title,
                    ecenary: req.body.ecenary,
                    page: req.body.page,
                    option: req.body.option
               };
          } else {
               gamble = undefined;
          }


          const response: any = await serviceContainer.ai.getCreateYourHistoryGame.run(idsBooks, gamble);

          res.status(200).json(response);
     }

}
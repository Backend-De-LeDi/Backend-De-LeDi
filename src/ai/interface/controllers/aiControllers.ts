import { Types } from "mongoose";
import { serviceContainer } from "../../../shared/services/serviceContainer";
import type { Request, Response } from "express";

export class AIControlles {
     async getGameCreateYourHistory(req: Request, res: Response): Promise<any> {
          const idsBooks: string = req.params.id;

          if (!Types.ObjectId.isValid(idsBooks)) return res.status(400).json({ "msg": "id invalida" });

          const response: { game: string } = await serviceContainer.ai.getCreateYourHistoryGame.run(idsBooks);

          res.status(200).json(response);

     }
}
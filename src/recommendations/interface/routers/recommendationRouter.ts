import { Router } from "express";
import { RecommendationsController } from "../controller/recommendationController";
import type { Request, Response } from "express";

import { validateJWT } from "../../../shared/middlewares/validateJWT";

const recommendationsRouter = Router();
const recommendationController = new RecommendationsController();

recommendationsRouter.get("/recommendations",
  validateJWT

  , (req: Request, res: Response) => {
    recommendationController.getRecommendations(req, res);
  });

export { recommendationsRouter };

import { Router } from "express";
import { RecommendationsController } from "../controller/recommendationController";
import type { Request, Response } from "express";
import { validateBooksJWT } from "../../../shared/middlewares/validateBookJWT";

const recommendationsRouter = Router();
const recommendationController = new RecommendationsController();

recommendationsRouter.get("/recommendations", validateBooksJWT, (req: Request, res: Response) => {
  recommendationController.getRecommendations(req, res);
});

export { recommendationsRouter };

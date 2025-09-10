import { Router } from "express";
import { RecommendationControllers } from "../controllers/recommendationControllers";
import { Response, Request } from "express";
import { validateBooksJWT } from "../../../shared/middlewares/validateBookJWT";

const recommendationRouters = Router();

const recommendationControllers = new RecommendationControllers();

recommendationRouters.get("/recommendations", validateBooksJWT, (req: Request, res: Response) => {
  recommendationControllers.getRecommendations(req, res);
});

export { recommendationRouters };

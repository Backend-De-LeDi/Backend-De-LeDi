import { Router } from "express";
import { RecommendationControllers } from "../controllers/recommendationControllers";
import { Response, Request } from "express";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

const recommendationRouters = Router();

const recommendationControllers = new RecommendationControllers();

recommendationRouters.get("/recommendations", validateJWT, (req: Request, res: Response) => {
  recommendationControllers.getRecommendations(req, res);
});

export { recommendationRouters };

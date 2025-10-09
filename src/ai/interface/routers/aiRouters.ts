import type { Request, Response } from "express";
import { Router } from "express";
import { AIControlles } from "../controllers/aiControllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

const aIRouter = Router();
const aIControlles = new AIControlles();

aIRouter.post("/createYourHistory/:id", validateJWT, (req: Request, res: Response) => {
  aIControlles.getGameCreateYourHistory(req, res);
});

aIRouter.get("/quiz/:id", validateJWT, (req: Request, res: Response) => {
  aIControlles.getQuiz(req, res);
});

export default aIRouter;

import type { Request, Response } from "express";
import { Router } from "express";
import { GameControllers } from "../controllers/gameControllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

const gameRouter = Router();
const gameControls = new GameControllers();

gameRouter.post("/createYourHistory/:id", validateJWT, (req: Request, res: Response) => {
  gameControls.getGameCreateYourHistory(req, res);
});

gameRouter.post("/quiz/:id", validateJWT, (req: Request, res: Response) => {
  gameControls.getQuiz(req, res);
});

export default gameRouter;

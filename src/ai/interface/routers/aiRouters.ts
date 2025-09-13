import type { Request, Response } from "express";
import { Router } from "express";
import { AIControlles } from "../controllers/aiControllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

const aIRouter = Router()
const aIControlles = new AIControlles();

aIRouter.get("/createYourHistory/:id", validateJWT, (req: Request, res: Response) => {
     aIControlles.getGameCreateYourHistory(req, res)
})

export default aIRouter
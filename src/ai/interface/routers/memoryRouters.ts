import { Request, Response, Router } from "express";
import { MemoryControllers } from "../controllers/memoryControllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

const control = new MemoryControllers();
const memoryRouter = Router();

memoryRouter.get("/myMemory", validateJWT, (req: Request, res: Response) => {
  control.getAllMemory(req, res);
});

memoryRouter.get("/memory/:id", validateJWT, (req: Request, res: Response) => {
  control.getMemoryById(req, res);
});

export default memoryRouter;

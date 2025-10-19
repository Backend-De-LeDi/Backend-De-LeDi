import { Router, Request, Response } from "express";
import { BookForAuthorController } from "../controller/booksForAuthorController";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

const authorsRouter = Router();
const controller = new BookForAuthorController();

authorsRouter.get("/book/autor/:id", validateJWT, (req: Request, res: Response) => { controller.getBookByAuthorId(req, res) }
);

export default authorsRouter;
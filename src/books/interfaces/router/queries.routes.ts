import { Router, Request, Response } from "express";
import { BooksQueryController } from "../controller/booksQueryController";
import { validateJWT } from "../../../shared/middlewares/validateJWT";

const queriesRouter = Router();
const controller = new BooksQueryController();

queriesRouter.get("/books/:query", validateJWT, (req: Request, res: Response) => { controller.getIntelligenceBooks(req, res) }
);

queriesRouter.post("/booksByFiltering", validateJWT, (req: Request, res: Response) => { controller.getBooksByFiltering(req, res) }
);

queriesRouter.get("/booksProgress", validateJWT, (req: Request, res: Response) => { controller.getBookByProgress(req, res) }
);

queriesRouter.get("/book/content/:id", validateJWT, (req: Request, res: Response) => { controller.getContentBookById(req, res) }
);


export default queriesRouter;

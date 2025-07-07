import { Router } from "express";
import { AudiobookController } from "../controller/audiobooksController";
import upload from "../../../shared/middlewares/storage";
import { Request, Response } from "express";
import { parseFormData } from "../../../shared/utils/parseFormData";
import { validatorBooks } from "../../../shared/middlewares/validatorBooks";
import { bookSchema } from "../../../shared/validations/book.validations";

const audiobookRouter = Router();
const controller = new AudiobookController();

audiobookRouter.post(
  "/books",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  parseFormData,
  validatorBooks(bookSchema),
  (req: Request, res: Response) => {
    controller.createBook(req, res);
  }
);

audiobookRouter.get("/books", (req: Request, res: Response) => {
  controller.getAllBook(req, res);
});

audiobookRouter.get("/book/:id", (req: Request, res: Response) => {
  controller.getBookById(req, res);
});

audiobookRouter.delete("/book/:id", (req: Request, res: Response) => {
  controller.deleteAudiobook(req, res);
});

audiobookRouter.get("/books/:query", (req: Request, res: Response) => {
  controller.getIntelligenceBooks(req, res);
});

audiobookRouter.get("/booksBySubgenre/:subgenre", (req: Request, res: Response) => {
  controller.getBookBySubgenre(req, res);
});

audiobookRouter.get("/book/content/:id", (req: Request, res: Response) => {
  controller.getContentBookById(req, res);
});

audiobookRouter.get("/booksByTheme/:theme", (req: Request, res: Response) => {
  controller.getBookByTheme(req, res);
});

export default audiobookRouter;

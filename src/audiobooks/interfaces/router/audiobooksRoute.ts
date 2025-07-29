import { Router } from "express";
import { AudiobookController } from "../controller/audiobooksController";
import upload from "../../../shared/middlewares/storage";
import { Request, Response } from "express";
import { parseFormData } from "../../../shared/utils/parseFormData";
import { validatorBooks } from "../../../shared/middlewares/validatorBooks";
import { bookSchema } from "../../../shared/validations/book.validations";
import { validateBooksJWT } from "../../../shared/middlewares/validateBookJWT";
import { validatorAudiobooks } from "../../../shared/middlewares/validatorAudiobooks";

const audiobookRouter = Router();
const controller = new AudiobookController();

audiobookRouter.post(
  "/audiobooks",
  validateBooksJWT,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  parseFormData,
  validatorAudiobooks(bookSchema),
  (req: Request, res: Response) => {
    controller.createBook(req, res);
  }
);

audiobookRouter.get("/audiobooks", (req: Request, res: Response) => {
  controller.getAllBook(req, res);
});

audiobookRouter.get("/audiobook/:id", (req: Request, res: Response) => {
  controller.getBookById(req, res);
});

audiobookRouter.delete("/audiobook/:id", (req: Request, res: Response) => {
  controller.deleteAudiobook(req, res);
});

audiobookRouter.get("/audiobooks/:query", (req: Request, res: Response) => {
  controller.getIntelligenceBooks(req, res);
});

audiobookRouter.get("/audiobook/content/:id", (req: Request, res: Response) => {
  controller.getContentBookById(req, res);
});

export default audiobookRouter;

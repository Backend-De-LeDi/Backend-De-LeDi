import { Router } from "express";
import { BookController } from "../controller/booksController";
import upload from "../../../shared/middlewares/storage";
import { Request, Response } from "express";
import { parseFormData } from "../../../shared/utils/parseFormData";
import { validatorBooks } from "../../../shared/middlewares/validatorBooks";
import { bookSchema } from "../../../shared/validations/book.validations";
import { validateBooksJWT } from "../../../shared/middlewares/validateBookJWT";
import { validateLevel } from "../../../shared/middlewares/validateLevel";

const bookRouter = Router();
const controller = new BookController();

bookRouter.post(
  "/books",
  validateBooksJWT,
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

bookRouter.get("/books", validateLevel, (req: Request, res: Response) => {
  controller.getAllBook(req, res);
});

bookRouter.get("/book/:id", (req: Request, res: Response) => {
  controller.getBookById(req, res);
});

bookRouter.delete("/book/:id", (req: Request, res: Response) => {
  controller.deleteBook(req, res);
});

bookRouter.get("/books/:query", (req: Request, res: Response) => {
  controller.getIntelligenceBooks(req, res);
});

bookRouter.get("/booksBySubgenre/:subgenre", (req: Request, res: Response) => {
  controller.getBookBySubgenre(req, res);
});

bookRouter.get("/book/content/:id", (req: Request, res: Response) => {
  controller.getContentBookById(req, res);
});

bookRouter.get("/booksByTheme/:theme", (req: Request, res: Response) => {
  controller.getBookByTheme(req, res);
});

export default bookRouter;

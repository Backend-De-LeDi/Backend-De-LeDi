import { Router } from "express";
import { ExpressController } from "../controller/booksController";
import upload from "../../../shared/middlewares/storage";
import { Request, Response } from "express";
import { parseFormData } from "../../../shared/utils/parseFormData";
import { validatorBooks } from "../../../shared/middlewares/validatorData";
import { bookSchema } from "../../../shared/validations/book.validations";

const BookRouter = Router();
const controller = new ExpressController();

BookRouter.post(
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

BookRouter.get("/books", (req: Request, res: Response) => {
  controller.getAllBook(req, res);
});

BookRouter.get("/book/:id", (req: Request, res: Response) => {
  controller.getBookById(req, res);
});

BookRouter.delete("/book/:id", (req: Request, res: Response) => {
  controller.deleteBook(req, res);
});

BookRouter.get("/books/:query", (req: Request, res: Response) => {
  controller.getIntelligenceBooks(req, res);
});

BookRouter.get("/booksByCategory/:category", (req: Request, res: Response) => {
  controller.getBookByCategory(req, res);
});

BookRouter.get("/book/content/:id", (req: Request, res: Response) => {
  controller.getContentBookById(req, res);
});
export default BookRouter;

import { Router } from "express";
import { ExpressController } from "../controller/booksController";
import upload from "../../../shared/middlewares/storage";
import { Request, Response } from "express";

const route = Router();
const controller = new ExpressController();

route.post(
  "/books",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  (req: Request, res: Response) => {
    controller.createBook(req, res);
  }
);

route.get("/books", (req: Request, res: Response) => {
  controller.getAllBook(req, res);
});

route.get("/book/:id", (req: Request, res: Response) => {
  controller.getBookById(req, res);
});

route.delete("/book/:id", (req: Request, res: Response) => {
  controller.deleteBook(req, res);
});

route.get("/books/:query", (req: Request, res: Response) => {
  controller.getIntelligenceBooks(req, res);
});

route.get("/booksByCategory/:category", (req: Request, res: Response) => {
  controller.getBookByCategory(req, res);
});

route.get("/book/content/:id", (req: Request, res: Response) => {
  controller.getContentBookById(req, res);
});
export default route;

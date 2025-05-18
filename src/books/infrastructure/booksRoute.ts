import { Router } from "express";
import { ExpressController } from "./booksController";
import upload from "../shader/middleware/storage";
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

export default route;

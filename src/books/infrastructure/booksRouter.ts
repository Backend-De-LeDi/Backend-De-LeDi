import { Router } from "express";
import { ExpressController } from "./booksController";
import upload from "../shader/middleware/storage";

const route = Router();
const controller = new ExpressController();

route.post(
  "/books",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  controller.createBook
);
route.get("/books", controller.getAllBook);
export default route;

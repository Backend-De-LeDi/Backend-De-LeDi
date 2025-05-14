import { Router } from "express";
import { ExpressController } from "./expressBooksController";
import upload from "../shader/middleware/storage";

const route = Router();
const controller = new ExpressController();

route.post(
  "/createBook",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  controller.create
);

export default route;

import { AudiobookControllers } from "../controllers/audiobookControllers";
import { Router } from "express";
import type { Response, Request } from "express";
import upload from "../../../shared/middlewares/storage";
import { parseFormData } from "../../../shared/utils/parseFormData";

const audiobookRouter = Router();
const audioBookControllers = new AudiobookControllers();

audiobookRouter.post(
  "/audiobooks",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  parseFormData,
  (req: Request, res: Response) => {
    audioBookControllers.createAudioBook(req, res);
  }
);

audiobookRouter.get("/audiobooks", (req: Request, res: Response) => {
  audioBookControllers.getAllAudiobooks(req, res);
});
audiobookRouter.get("/audiobooks/:id", (req: Request, res: Response) => {
  audioBookControllers.getAudioBookById(req, res);
});
audiobookRouter.delete("/audiobooks/:id", (req: Request, res: Response) => {
  audioBookControllers.deleteAudiobook(req, res);
});

export default audiobookRouter;

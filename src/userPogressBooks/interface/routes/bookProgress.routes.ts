import { Router } from "express";

export const progressRouter = Router();
import { saveBookProgress } from "../controllers/bookSaveProgress.controllers";
import { updateProgresBook } from "../controllers/updateProgress.controllers";
import { deleteProgresBook } from "../controllers/deleteProgress.controllers";


progressRouter.post('/progress', saveBookProgress)
progressRouter.put('/progress', updateProgresBook)
progressRouter.delete('/progress', deleteProgresBook)


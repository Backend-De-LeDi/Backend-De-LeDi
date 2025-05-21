import { Router } from "express";

export const bookRouter = Router();
import { saveBookProgress } from "../controllers/bookSaveProgress.controllers";
import { updateProgresBook } from "../controllers/updateProgress.controllers";
import { deleteProgresBook } from "../controllers/deleteProgress.controllers";


bookRouter.post('/progress', saveBookProgress)
bookRouter.put('/progress', updateProgresBook)
bookRouter.delete('/progress', deleteProgresBook)


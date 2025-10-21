import { Router } from "express";

export const progressRouter = Router();
import { saveBookProgress } from "../controllers/bookSaveProgress.controllers";
import { updateProgresBook } from "../controllers/updateProgress.controllers";
import { deleteProgresBook } from "../controllers/deleteProgress.controllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { findByProgressIdControllers } from "../controllers/findProgress";


progressRouter.post('/SaveProgress', saveBookProgress)
progressRouter.get('/Progress', validateJWT, findByProgressIdControllers)
progressRouter.put('/progress', updateProgresBook)
progressRouter.delete('/progress', deleteProgresBook)


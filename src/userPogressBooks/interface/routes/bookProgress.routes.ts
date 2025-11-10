import { Router } from "express";

export const progressRouter = Router();
import { saveBookProgress } from "../controllers/bookSaveProgress.controllers";
import { updateProgresBook } from "../controllers/updateProgress.controllers";
import { deleteProgresBook } from "../controllers/deleteProgress.controllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { findByProgressIdControllers } from "../controllers/findProgress";


progressRouter.post('/SaveProgress',validateJWT ,saveBookProgress)
progressRouter.get('/Progress', validateJWT, findByProgressIdControllers)
progressRouter.put('/progress',validateJWT, updateProgresBook)
progressRouter.delete('/progress', validateJWT,deleteProgresBook)


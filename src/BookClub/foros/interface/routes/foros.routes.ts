import { Router } from "express";
import { createForoController } from "../controllers/createForo.controllers";
import { findForoById, findForoControllers } from "../controllers/findForo";
import { deleteForo } from "../controllers/deleteForoControllers";

export const forosRoutes = Router();

forosRoutes.post("/createForo", createForoController);
forosRoutes.get("/foros", findForoControllers);
forosRoutes.get("/foro/:id", findForoById);
forosRoutes.delete("/foro/:id", deleteForo)
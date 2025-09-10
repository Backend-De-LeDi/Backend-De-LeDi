import { Router } from "express";
import { createForoController } from "../controllers/createForo.controllers";
import { findForoById, findForoControllers } from "../controllers/findForo";
import { deleteForo } from "../controllers/deleteForoControllers";
import { validarRol } from "../../../../shared/middlewares/validateRol";
import { validateJWT } from "../../../../shared/middlewares/validateJWT";

export const forosRoutes = Router();

forosRoutes.post("/createForo", validateJWT, validarRol("Admin"), createForoController);
forosRoutes.get("/foros", findForoControllers);
// forosRoutes.get("/foro/:id", findForoById);
forosRoutes.delete("/foro/:id", deleteForo)
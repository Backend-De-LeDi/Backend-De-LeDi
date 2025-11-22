import { Router } from "express";
import { createComentHttp } from "../controllers/createComentControllers";
import { getAdmindComent } from "../controllers/findComentControllers";
import { validateJWT } from "../../../../shared/middlewares/validateJWT";
import { validarRol } from "../../../../shared/middlewares/validateRol";

export const comentRoutes = Router();


comentRoutes.post("/admin/coment", validateJWT, validarRol("Admin"), createComentHttp)
comentRoutes.get("/admin/coments", getAdmindComent
)
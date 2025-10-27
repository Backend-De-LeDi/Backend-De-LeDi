import { Request, Response, Router } from "express";
import { getMeCtrl, login, logout, } from "../controllers/auth.controllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { sendEmailController, validationToken } from "../controllers/Reset.password.controller";

export const authRoutes = Router();

// authRoutes.post("/save_auth", postAuth);
authRoutes.post("/login", login);
authRoutes.get("/getUser", validateJWT, getMeCtrl)
authRoutes.post('/logout', logout)
authRoutes.post("/reset-password", sendEmailController)
authRoutes.post("/validateToken", validationToken)
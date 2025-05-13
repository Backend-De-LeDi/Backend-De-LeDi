import { Router } from "express";
import { registerValidation } from "../../shared/validations/user.validations";

import { createUsers, } from "../controllers/user.controllers";

export const userRoutes = Router();

userRoutes.post("/register", registerValidation, createUsers);
// userRoutes.get("/user/:id", getById);
// userRoutes.post("/user/email", getByEmail);

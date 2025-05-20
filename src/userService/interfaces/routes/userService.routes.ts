import { Router } from "express";

import { createUsers, } from "../controllers/user.controllers";
import { registerValidation } from "../../../shared/validations/user.validations";

export const userRoutes = Router();

userRoutes.post("/register", registerValidation, createUsers);
// userRoutes.get("/user/:id", getById);
// userRoutes.post("/user/email", getByEmail);

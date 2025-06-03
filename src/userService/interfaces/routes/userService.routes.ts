import { Router } from "express";

import { registers, } from "../controllers/register.controllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { findAndUpdate } from "../controllers/updateUser.controllers";
import { deleteUser, findById, findUser } from "../controllers/findAndDelete.controllers";
import { RegisterSchema } from "../Schemas/registerSchema";
import { validate } from "../../../shared/middlewares/validate";

export const userRoutes = Router();

userRoutes.post("/register", validate(RegisterSchema), registers);
userRoutes.put('/updateUser', validateJWT, findAndUpdate)
userRoutes.get('/users', findUser)
userRoutes.get('/oneUser', validateJWT, findById)
userRoutes.delete('/delete', validateJWT, deleteUser)

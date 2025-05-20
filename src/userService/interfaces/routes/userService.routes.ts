import { Router } from "express";

import { registers, } from "../controllers/register.controllers";
import { registerValidation } from "../../../shared/validations/user.validations";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { findAndUpdate } from "../controllers/updateUser.controllers";
import { deleteUser, findById, findUser } from "../controllers/findAndDelete.controllers";

export const userRoutes = Router();

userRoutes.post("/register", registerValidation, registers);
userRoutes.put('/updateUser', validateJWT, findAndUpdate)
userRoutes.get('/users', findUser)
userRoutes.get('/oneUser', validateJWT, findById)
userRoutes.delete('/delete', validateJWT, deleteUser)

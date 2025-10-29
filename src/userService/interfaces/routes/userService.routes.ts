import { Router } from "express";
import multer from "multer";
import { registers } from "../controllers/register.controllers";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { findAndUpdate } from "../controllers/updateUser.controllers";
import { deleteUser, findById, findUser } from "../controllers/findAndDelete.controllers";
import { UserValidation } from "../../application/validations/userValidation";

export const userRoutes = Router();

userRoutes.post("/register", UserValidation, (req, res) => {
    const userData = req.body;
}, registers);
userRoutes.put("/updateUser", validateJWT, findAndUpdate);
userRoutes.get("/users", findUser);
userRoutes.get("/oneUser", validateJWT, findById);
userRoutes.delete("/delete", validateJWT, deleteUser);

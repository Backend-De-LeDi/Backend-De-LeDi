import { Router } from "express";
import multer from "multer";
import { deleteAvatar, saveAvatar } from "../controllers/avatar.controllers";



export const avaRoutes = Router()

const upload = multer({ dest: "uploads/" });


avaRoutes.post("/saveAvatar", upload.single("avatars"), saveAvatar)
avaRoutes.delete("/deleteAvatar/:id", deleteAvatar)
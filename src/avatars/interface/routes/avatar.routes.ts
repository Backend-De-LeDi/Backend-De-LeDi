import { Router } from "express";
import multer from "multer";
import { deleteAvatar, getAvatars, saveAvatar, updateAvatar } from "../controllers/avatar.controllers";



export const avaRoutes = Router()

const upload = multer({ dest: "uploads/" });


avaRoutes.post("/saveAvatar", upload.single("avatars"), saveAvatar)
avaRoutes.delete("/deleteAvatar/:id", deleteAvatar)
avaRoutes.get("/getAvatars", getAvatars)
avaRoutes.put("/updateAvatar/:id", upload.single("avatars"), updateAvatar)
import { Router } from "express";
import multer from "multer";
import { deleteLevel, getFirtsLevel, getLeves, saveLevel } from "../controllers/level.controllers";



export const levelRoutes = Router()

const upload = multer({ dest: "uploads/" });


levelRoutes.post("/saveLevel", upload.single("levels"), saveLevel)
levelRoutes.delete("/deleteLevel/:id", deleteLevel)
levelRoutes.get("/getLevel", getLeves)
levelRoutes.get("/firtsLevel", getFirtsLevel)
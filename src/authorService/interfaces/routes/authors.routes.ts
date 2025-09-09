import { Router } from "express";
import { createAuthor } from "../controllers/saveAuthor.controllers";
import { validarRol } from "../../../shared/middlewares/validateRol";
import { getAllAuthores, getAuthorById, getAuthorByName } from "../controllers/findAuthor.controllers";
import { deleteAuthorById } from "../controllers/deleteAuthor.controllers";
import { updataAuthors } from "../controllers/updateAuthor.controllers";
import multer from "multer";


export const autorRoutes = Router()
const upload = multer({ dest: "uploads/" });


autorRoutes.post("/author/create", upload.single("avatar"), createAuthor);
autorRoutes.get("/author/:id", getAuthorById)
autorRoutes.get("/author", getAuthorByName)
autorRoutes.get("/AllAuthores", getAllAuthores)
autorRoutes.delete('/author/:id', deleteAuthorById)
autorRoutes.put("/author/:id", updataAuthors)
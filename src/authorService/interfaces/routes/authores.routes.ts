import { Router } from "express";
import { createAuthor } from "../controllers/saveAuthor.controllers";
import { validarRol } from "../../../shared/middlewares/validateRol";
import { getAuthorById, getAuthorByName } from "../controllers/findAuthor.controllers";
import { deleteAuthorById } from "../controllers/deleteAuthor.controllers";
import { updataAuthors } from "../controllers/updateAuthor.controllers";


export const autorRoutes = Router()


autorRoutes.post("/author/create", createAuthor);
autorRoutes.get("/author/:id", getAuthorById)
autorRoutes.get("/author", getAuthorByName)
autorRoutes.delete('/author/:id', deleteAuthorById)
autorRoutes.put("/author/:id", updataAuthors)
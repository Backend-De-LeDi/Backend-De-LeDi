import { Router, Request, Response } from "express";
import { BooksCrudController } from "../controller/booksCrudController";
import upload from "../../../shared/middlewares/storage";
import { parseFormData } from "../../../shared/utils/parseFormData";
import { validatorBooks } from "../../../shared/middlewares/validatorBooks";
import { bookSchema } from "../../../shared/validations/book.validations";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { validarRol } from "../../../shared/middlewares/validateRol";
import { validateLevel } from "../../../shared/middlewares/validateLevel";

const crudRouter = Router();
const controller = new BooksCrudController();

crudRouter.post(
     "/books",
     validateJWT,
     validarRol("Admin"),
     upload.fields([{ name: "file", maxCount: 1 }, { name: "img", maxCount: 1 }]),
     parseFormData,
     validatorBooks(bookSchema),
     (req: Request, res: Response) => { controller.createBook(req, res) }
);

crudRouter.patch(
     "/book/:id",
     validateJWT,
     validarRol("Admin"),
     upload.fields([{ name: "file", maxCount: 1 }, { name: "img", maxCount: 1 }]),
     parseFormData,
     (req: Request, res: Response) => { controller.updateBookById(req, res) }
);

crudRouter.delete(
     "/book/:id",
     validateJWT,
     validarRol("Admin"),
     (req: Request, res: Response) => { controller.deleteBook(req, res) }


);

crudRouter.get("/books", validateLevel, (req: Request, res: Response) => { controller.getAllBook(req, res) }
);

crudRouter.get("/book/:id", validateJWT, (req: Request, res: Response) => { controller.getBookById(req, res) }
);


export default crudRouter;
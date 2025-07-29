import { Router } from "express";
import { BookController } from "../controller/booksController";
import upload from "../../../shared/middlewares/storage";
import { Request, Response } from "express";
import { parseFormData } from "../../../shared/utils/parseFormData";
import { validatorBooks } from "../../../shared/middlewares/validatorBooks";
import { bookSchema } from "../../../shared/validations/book.validations";
import { validateBooksJWT } from "../../../shared/middlewares/validateBookJWT";
import { validateLevel } from "../../../shared/middlewares/validateLevel";

const bookRouter = Router();
const controller = new BookController();

// ? ruta para crear libros ✅
bookRouter.post(
  "/books",
  validateBooksJWT,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  parseFormData,
  validatorBooks(bookSchema),
  (req: Request, res: Response) => {
    controller.createBook(req, res);
  }
);

// ? ruta para obtener todo los libros ✅
bookRouter.get("/books", validateLevel, (req: Request, res: Response) => {
  controller.getAllBook(req, res);
});

// ? ruta para obtener libro por ID ✅
bookRouter.get("/book/:id", (req: Request, res: Response) => {
  controller.getBookById(req, res);
});

// ? ruta para eliminar libro por ID 🔄️
bookRouter.delete("/book/:id", validateBooksJWT, (req: Request, res: Response) => {
  controller.deleteBook(req, res);
});

// ? ruta para obtener libro en base a una consulta ✅
bookRouter.get("/books/:query", validateBooksJWT, (req: Request, res: Response) => {
  controller.getIntelligenceBooks(req, res);
});

// ? ruta para obtener el contenido del libro por ID ✅
bookRouter.get("/book/content/:id", validateBooksJWT, (req: Request, res: Response) => {
  controller.getContentBookById(req, res);
});

// ? ruta para obtener libro en base a filtros y ordenarlos por cual cumple mas las condiciones ✅
bookRouter.post("/booksByFiltering", validateBooksJWT, (req: Request, res: Response) => {
  controller.getBooksByFiltering(req, res);
});
export default bookRouter;

import { Router } from "express";
import { BookController } from "../controller/booksController";
import upload from "../../../shared/middlewares/storage";
import { Request, Response } from "express";
import { parseFormData } from "../../../shared/utils/parseFormData";
import { validatorBooks } from "../../../shared/middlewares/validatorBooks";
import { bookSchema } from "../../../shared/validations/book.validations";
import { validateLevel } from "../../../shared/middlewares/validateLevel";
import { validateJWT } from "../../../shared/middlewares/validateJWT";
import { validarRol } from "../../../shared/middlewares/validateRol";

const bookRouter = Router();
const controller = new BookController();

// ✅
bookRouter.post(
  "/books",
  validateJWT,
  validarRol("Admin"),
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

// ✅
bookRouter.get("/books", validateLevel, (req: Request, res: Response) => {
  controller.getAllBook(req, res);
});

// ✅
bookRouter.get("/book/:id", validateJWT, (req: Request, res: Response) => {
  controller.getBookById(req, res);
});

// 🔄️
bookRouter.delete("/book/:id", validateJWT, validarRol("Admin"), (req: Request, res: Response) => {
  controller.deleteBook(req, res);
});

// ✅
bookRouter.get("/books/:query", validateJWT, (req: Request, res: Response) => {
  controller.getIntelligenceBooks(req, res);
});

// ✅
bookRouter.get("/book/content/:id", validateJWT, (req: Request, res: Response) => {
  controller.getContentBookById(req, res);
});

// ✅
bookRouter.get("/book/autor/:id", validateJWT, (req: Request, res: Response) => {
  controller.getBookByAuthorId(req, res);
});

// ✅
bookRouter.post("/booksByFiltering", validateJWT, (req: Request, res: Response) => {
  controller.getBooksByFiltering(req, res);
});

// ✅
bookRouter.get("/booksThemes", (req: Request, res: Response) => {
  controller.getAllThemes(req, res);
});

// ✅
bookRouter.get("/booksSubgenres", (req: Request, res: Response) => {
  controller.getAllSubgenres(req, res);
});

// ✅
bookRouter.get("/booksGenres", (req: Request, res: Response) => {
  controller.getAllGenres(req, res);
});

// ✅
bookRouter.get("/booksYears", (req: Request, res: Response) => {
  controller.getAllYears(req, res);
});

// ✅
bookRouter.get("/booksFormats", (req: Request, res: Response) => {
  controller.getAllFormats(req, res);
});

bookRouter.get("/books/Progress", validateJWT, (req: Request, res: Response) => {
  controller.getBookByProgress(req, res);
});

export default bookRouter;

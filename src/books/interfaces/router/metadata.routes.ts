import { Router, Request, Response } from "express";
import { BooksMetadataController } from "../controller/booksMetadataController";

const metadataRouter = Router();
const controller = new BooksMetadataController();

metadataRouter.get("/booksThemes", (req: Request, res: Response) => { controller.getAllThemes(req, res) }
);
metadataRouter.get("/booksSubgenres", (req: Request, res: Response) => { controller.getAllSubgenres(req, res) }
);
metadataRouter.get("/booksGenres", (req: Request, res: Response) => { controller.getAllGenres(req, res) }
);
metadataRouter.get("/booksYears", (req: Request, res: Response) => { controller.getAllYears(req, res) }
);
metadataRouter.get("/booksFormats", (req: Request, res: Response) => { controller.getAllFormats(req, res) }
);

export default metadataRouter;
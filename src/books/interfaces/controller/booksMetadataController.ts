
import { GetAllThemes, GetAllFormats, GetAllGenres, GetAllSubgenres, GetAllYearsBooks } from "../../application";
import { MongoMetadataRepository } from "../../infrastructure/mongo";
import { Request, Response } from "express";

const mongoMetadataRepo = new MongoMetadataRepository()
const getTheme = new GetAllThemes(mongoMetadataRepo)
const getFormats = new GetAllFormats(mongoMetadataRepo)
const getGenres = new GetAllGenres(mongoMetadataRepo)
const getSubgenres = new GetAllSubgenres(mongoMetadataRepo)
const getYears = new GetAllYearsBooks(mongoMetadataRepo)

export class BooksMetadataController {
     // ✅
     async getAllThemes(_req: Request, res: Response): Promise<Response> {
          const themes = await getTheme.run();
          return res.status(200).json(themes);
     }

     // ✅
     async getAllSubgenres(_req: Request, res: Response): Promise<Response> {
          const subgenres = await getSubgenres.run();
          return res.status(200).json(subgenres);
     }

     // ✅
     async getAllGenres(_req: Request, res: Response): Promise<Response> {
          const genres = await getGenres.run();
          return res.status(200).json(genres);
     }

     // ✅
     async getAllYears(_req: Request, res: Response): Promise<Response> {
          const years = await getYears.run();
          return res.status(200).json(years);
     }

     // ✅
     async getAllFormats(_req: Request, res: Response): Promise<Response> {
          const formats = await getFormats.run();
          return res.status(200).json(formats);
     }
}
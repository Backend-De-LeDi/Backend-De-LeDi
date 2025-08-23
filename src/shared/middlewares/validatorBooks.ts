import { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";
import { fileDelete } from "../utils/deleteFile";
import chalk from "chalk";
import { separator } from "../utils/consoleSeparator";

export const validatorBooks = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = schema.safeParse(req.body);

      if (result.success) {
        return next();
      }

      const files = req.files as { [key: string]: Express.Multer.File[] } | undefined;

      const deleteUploadedFiles = async () => {
        if (files?.img?.[0]) await fileDelete(files.img[0].path);
        if (files?.file?.[0]) await fileDelete(files.file[0].path);
      };

      const missingFileMsg = (): string => {
        if (!files?.file?.[0] && !files?.img?.[0]) return "Debes subir el contenido y la portada del libro";
        if (!files?.file?.[0]) return "Debes subir el contenido de texto del libro";
        if (!files?.img?.[0]) return "Debes subir la portada del libro";
        return "";
      };

      // Si no hay archivos subidos
      if (!files || !files.file?.[0] || !files.img?.[0]) {
        await deleteUploadedFiles();
        res.status(400).json({ msg: missingFileMsg() });
        return;
      }

      // Si hay errores de validación
      await deleteUploadedFiles();
      res.status(400).json({
        errors: result.error.errors.map((err) => ({
          path: err.path.length ? err.path.join(".") : "general",
          message: err.message,
        })),
      });
      return;
    } catch (error) {
      console.log(chalk.yellow("Error en el middleware: validatorBooks"));
      console.log(chalk.yellow(separator()));
      console.log(error);
      console.log(chalk.yellow(separator()));
      res.status(500).json({ msg: "Error inesperado, por favor intente de nuevo más tarde" });
    }
  };
};

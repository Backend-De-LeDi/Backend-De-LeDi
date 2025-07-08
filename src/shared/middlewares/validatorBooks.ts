import { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";
import { fileDelete } from "../utils/deleteFile";
import chalk from "chalk";
import { separator } from "../utils/consoleSeparator";

// ? función que recibe los campos desde el cliente,
// ? los valida si se cumple correctamente con los campos pasa sin avisar de errores del campo

export const validatorBooks = <T>(schema: ZodSchema<T>) => {
  // * retorna la ejecución de un middleware anónimo que tiene como parámetro req,res,next
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // * validamos los campos
      const result = schema.safeParse(req.body);

      // * si no hay errores devuelve una respuesta con los mensajes de cada campo que se completo mal
      if (!result.success) {
        // * se obtiene lo archivos para eliminarlos en local y no cargar el servidor local
        const files = req.files as { [key: string]: Express.Multer.File[] };

        // * validamos si recibimos los contenidos
        if (files == null) {
          res.status(400).json({
            msg: `Debes subir el contenido y la portada del libro`,
          });
          return;
        }

        // * validamos si alguno de los dos esta mal
        if (!files?.file?.[0] || !files.img?.[0]) {
          // * respondemos si falta alguno en especifico
          res.status(400).json({
            msg: `${
              !files?.file?.[0] && !files.img?.[0]
                ? "Debes subir el contenido y la portada del libro"
                : !files?.file?.[0]
                ? "Debes subir el contenido de texto del libro"
                : !files.img?.[0] && "Debes subir la portada del libro "
            }`,
          });

          // * hacemos la eliminación para limpiar localmente
          if (files.img?.[0]) await fileDelete(files.img?.[0].path);
          if (files.file?.[0]) await fileDelete(files.file?.[0].path);

          // * paramos el código
          return;
        }

        res.status(400).json({
          errors: result.error.errors.map((err) => ({
            path: err.path.length ? err.path.join(".") : "general",
            message: err.message,
          })),
        });

        // * hacemos la eliminación para limpiar localmente
        if (files.img?.[0]) await fileDelete(files.img?.[0].path);
        if (files.file?.[0]) await fileDelete(files.file?.[0].path);

        return;
      }

      next();
    } catch (error) {
      console.log(chalk.yellow("Error en el middleware: validatorBooks"));
      console.log(chalk.yellow(separator()));
      console.log();
      console.log(error);
      console.log();
      console.log(chalk.yellow(separator()));
      res.status(500).json({ msg: "Error inesperado por favor intente de nuevo mas tarde" });
    }
  };
};

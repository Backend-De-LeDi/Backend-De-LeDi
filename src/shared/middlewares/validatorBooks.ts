import { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";
import { fileDelete } from "../utils/deleteFile";

// * función que recibe los campos desde el cliente,
// * los valida si se cumple correctamente con los campos pasa sin avisar de errores del campo

export const validatorBooks = <T>(schema: ZodSchema<T>) => {
  
  // * retorna la ejecución de un middleware anónimo que tiene como parámetro req,res,next
  return async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    
    // * validamos los campos 
    const result = schema.safeParse(req.body);

    
    // * si no hay errores devuelve una respuesta con los mensajes de cada campo que se completo mal 
    if (!result.success) {

      // * se obtiene lo archivos para eliminarlos en local y no cargar el servidor local
      const files = req.files as { [key: string]: Express.Multer.File[] };
      const img = files.img[0];
      const file = files.file[0];
      await fileDelete(img.path);
      await fileDelete(file.path);

      // * respondemos con los campos que estén mal 
      res.status(400).json({
        errors: result.error.errors.map((err) => ({
          path: err.path.length ? err.path.join(".") : "general",
          message: err.message,
        })),
      });

      // * detenemos el código
      return;
    }

    // * si todo los campos están bien pasa a la ejecución principal que hace el servidor  
    next();
  };
};

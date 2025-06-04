import { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";
import { fileDelete } from "../utils/deleteFile";

export const validatorBooks = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const files = req.files as { [key: string]: Express.Multer.File[] };

      const img = files.img[0];
      const file = files.file[0];

      await fileDelete(img.path);
      await fileDelete(file.path);

      res.status(400).json({
        errors: result.error.errors.map((err) => ({
          path: err.path.length ? err.path.join(".") : "general",
          message: err.message,
        })),
      });

      return;
    }

    next();
  };
};

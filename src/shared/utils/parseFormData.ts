import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const parseFormData = (req: Request, res: Response, next: NextFunction): void => {
  req.body = req.body || {}; // 🔹 Asegura que req.body no sea undefined

  for (const key in req.body) {
    try {
      if (key === "available") {
        req.body[key] = req.body[key] === "true"; // Convertir a booleano
      } else if (key === "subgenre") {
        req.body[key] = Array.isArray(req.body[key])
          ? req.body[key] // Si ya es un array, mantenerlo igual
          : [req.body[key]]; // Si es un string, convertirlo en array
      } else if (key === "author") {
        const val = req.body[key];
        const ids = Array.isArray(val) ? val : [val];
        req.body[key] = ids.map((id) => Types.ObjectId.createFromHexString(id));
      }
    } catch {
      // Si hay un error, mantener el valor original
    }
  }

  next();
};

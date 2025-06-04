import type { Request, Response, NextFunction } from "express";

export const parseFormData = (req: Request, res: Response, next: NextFunction): void => {
  req.body = req.body || {}; // 🔹 Asegura que req.body no sea undefined

  for (const key in req.body) {
    try {
      if (key === "available") {
        req.body[key] = req.body[key] === "true"; // Convertir a booleano
      } else if (key === "category") {
        req.body[key] = Array.isArray(req.body[key])
          ? req.body[key] // Si ya es un array, mantenerlo igual
          : [req.body[key]]; // Si es un string, convertirlo en array
      }
    } catch {
      // Si hay un error, mantener el valor original
    }
  }

  next();
};

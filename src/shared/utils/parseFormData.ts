import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

// * función que formatea los datos en estado de desarrollo
// * permite hacer las validaciones correctamente y temporalmente para el validador

export const parseFormData = (req: Request, res: Response, next: NextFunction): void => {
  req.body = req.body || {};

  for (const key in req.body) {
    try {
      if (key === "available") {

        req.body[key] = req.body[key] === "true";

      } else if (key === "subgenre") {

        req.body[key] = Array.isArray(req.body[key]) ? req.body[key] : [req.body[key]];

      } else if (key === "author") {

        const val = req.body[key];
        const ids = Array.isArray(val) ? val : [val];

        req.body[key] = ids.map((id) => Types.ObjectId.createFromHexString(id));

      } else if (key === "theme") {

        req.body[key] = Array.isArray(req.body[key]) ? req.body[key] : [req.body[key]];
      
      } else if (key === "format") {
      
        req.body[key] = Array.isArray(req.body[key]) ? req.body[key] : [req.body[key]];
      
      }

    } catch { }

  }

  next();
};

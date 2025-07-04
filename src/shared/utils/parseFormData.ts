import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

// * función que formatea los datos en estado de desarrollo
// * permite hacer las validaciones correctamente y temporalmente para el validador

export const parseFormData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // * recibimos los datos pero están con tipos de datos incorrectos

  req.body = req.body || {}; // * Asegura que req.body no sea undefined

  // * -------------------------------------------

  // * Recorremos el objeto por sus llames que almacenan los datos

  for (const key in req.body) {
    // * -------------------------------------------

    // * hacemos el bloque try catch solo por si hay algún valor que no se puede trasformas

    try {
      // * -------------------------------------------

      // * si en el recorrido en la llave "available"

      if (key === "available") {
        // * -------------------------------------------

        // * validamos si es true pero en string le damos true si no false

        req.body[key] = req.body[key] === "true"; // * Convertir a booleano

        // * -------------------------------------------

        // * si en la llave es subgenre hacemos el procesado
      } else if (key === "subgenre") {
        // * -------------------------------------------

        // * si es un array dejamos como esta, si no lo convertimos en array

        req.body[key] = Array.isArray(req.body[key])
          ? req.body[key]
          : [req.body[key]];

        // * -------------------------------------------

        // * si en la llave es author
      } else if (key === "author") {
        // * -------------------------------------------

        // * entramos el valor

        const val = req.body[key];

        // * -------------------------------------------

        // * validamos si es un array, si no lo transformamos y trasformamos en id de mongodb

        const ids = Array.isArray(val) ? val : [val];

        req.body[key] = ids.map((id) => Types.ObjectId.createFromHexString(id));
      } else if (key === "theme") {
        // * si es un array dejamos como esta, si no lo convertimos en array

        req.body[key] = Array.isArray(req.body[key])
          ? req.body[key]
          : [req.body[key]];
      }
    } catch {
      // * Si hay un error, mantener el valor original
    }
  }

  next();
};

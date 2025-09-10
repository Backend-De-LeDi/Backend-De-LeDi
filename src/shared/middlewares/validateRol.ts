import { NextFunction, Request, Response } from "express";

export function validarRol(...rolesPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user)
    if (!req.user) {
      res.status(401).json({ mensaje: "unauthenticated user" });
      return;
    }

    if (!rolesPermitidos.includes(req.user.rol)) {
      res.status(403).json({ mensaje: "You do not have permissions to access this resource" });
      return;
    }

    next();
  };
}

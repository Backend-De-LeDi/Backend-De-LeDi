import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// const SECRET_KEY = process.env.CLAVE_SECRETA;
const SECRET_KEY = "clave_secreta";
// Middleware para validar JWT

export const validateLevel = (req: Request, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers["authorization"]?.split(" ")[1];
  const tokenCookie = req.cookies?.token;

  const token = tokenCookie || tokenHeader;

  if (token && typeof token === "string") {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      req.user = decoded;
      next();
    });
  } else {
    next(); // si no hay token, continuar sin usuario
  }
};

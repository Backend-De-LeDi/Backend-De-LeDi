import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// const SECRET_KEY = process.env.CLAVE_SECRETA;
const SECRET_KEY = "clave_secreta";
// Middleware para validar JWT

export const validateBooksJWT = (req: Request, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers["authorization"]?.split(" ")[1];
  const tokenCookie = req.cookies?.token;

  console.log("Token Header:", tokenHeader);
  console.log("Token Cookie:", tokenCookie);

  if (!tokenHeader && !tokenCookie) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  if (tokenCookie && typeof tokenCookie === "string") {
    jwt.verify(tokenCookie, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token inválido" });
        return;
      }
      console.log(decoded);
      req.user = decoded;
      next();
    });
  }

  if (tokenHeader && typeof tokenHeader === "string") {
    jwt.verify(tokenHeader, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token inválido" });
        return;
      }

      console.log(decoded);
      req.user = decoded;
      next();
    });
  }
};

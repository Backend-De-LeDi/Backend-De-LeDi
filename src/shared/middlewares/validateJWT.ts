import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
// const SECRET_KEY = process.env.CLAVE_SECRETA;
const SECRET_KEY = "clave_secreta"
// Middleware para validar JWT
export const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token || typeof token !== 'string') {
        res.status(403).json({ message: 'Token no proporcionado' });
        return
    }

    jwt.verify(token as string, SECRET_KEY as string, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token inválido' });
            return
        }

        req.user = decoded; // <- Aquí debería agregarse correctamente
        next();
    });
};


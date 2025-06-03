import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import ENV from '../../config/configEnv';

dotenv.config();
// const SECRET_KEY = process.env.CLAVE_SECRETA;
const SECRET_KEY = ENV.JWT_SECRET as string;
// Middleware para validar JWT
export const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token || typeof token !== 'string') {
        res.status(403).json({ message: 'Token no proporcionado' });
        return;
    }

    if (!SECRET_KEY) {
        res.status(500).json({ message: 'Clave secreta no configurada' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token inválido' });
            return;
        }

        req.user = decoded;
        next();
    });
};



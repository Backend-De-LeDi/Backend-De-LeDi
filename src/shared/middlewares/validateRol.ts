import { NextFunction, Request, Response } from "express";


export function validarRol(...rolesPermitidos: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role) {
            res.status(401).json({ mensaje: 'unauthenticated user' });
            return
        }

        if (!rolesPermitidos.includes(req.user.role)) {
            res.status(403).json({ mensaje: 'You do not have permissions to access this resource' });
            return
        }

        next();
    };
}


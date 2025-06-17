import { NextFunction, Request, Response } from "express";


function validarRol(...rolesPermitidos: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ mensaje: 'unauthenticated user' });
        }

        if (!rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({ mensaje: 'You do not have permissions to access this resource' });
        }

        next();
    };
}

module.exports = validarRol;

import { NextFunction, Request, Response } from "express";
import { UserZodSchema } from "./userZodSchema";

export function UserValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = UserZodSchema.safeParse(req.body);

        if (!parsed.success) {
            console.log(parsed.error);
            res.status(400).json({
                error: 'Datos de validación inválidos',
                details: parsed.error.errors
            });
        }

        req.body = parsed.data;
        next();
    } catch (error) {
        next(error);
    }
}
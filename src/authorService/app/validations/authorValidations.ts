import { Request, Response, NextFunction } from 'express';
import { AuthorUpdateZodSchema, AuthorZodSchema } from './authorZodSchema';

export function authorValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = AuthorZodSchema.safeParse(req.body);

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
export function authorUpdateValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = AuthorUpdateZodSchema.safeParse(req.body);

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
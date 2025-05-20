import { body, validationResult } from 'express-validator';
import express, { Request, Response, NextFunction } from 'express';
export const checkValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    next();
};
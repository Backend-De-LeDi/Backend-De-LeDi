import { body } from 'express-validator';

export const registerValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres'),
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres'),
    body('lastName')
        .trim()
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres'),
    body('email')
        .isEmail().withMessage('El correo electrónico no es válido')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),

];

import { z } from "zod";

// Zod schema
export const UserZodSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    lastName: z.string().min(1, "El apellido es obligatorio"),
    userName: z.string().min(5, "El nombre de usuario es obligatorio"),
    birthDate: z.coerce.date(),
    email: z.string().email("Email no válido"),
    password: z.string().min(8, "La contraseña debe tener al menos 6 caracteres"),
    preference: z.object({
        category: z.array(z.string()).min(1, "Debe haber al menos una categoría"),
    }).optional(),
});

export const UserUpdateZodSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").optional(),
    lastName: z.string().min(1, "El apellido es obligatorio").optional(),
    userName: z.string().min(5, "El nombre de usuario es obligatorio").optional(),
    birthDate: z.coerce.date().optional(),
    email: z.string().email("Email no válido").optional(),
    password: z.string().min(8, "La contraseña debe tener al menos 6 caracteres").optional(),
    nivel: z.string().min(1, "El nivel es obligatorio").optional(),
    preference: z.object({
        category: z.array(z.string()).min(1, "Debe haber al menos una categoría"),
    }).optional(),
});


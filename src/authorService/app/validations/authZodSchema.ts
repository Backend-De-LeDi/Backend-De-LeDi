import { z } from 'zod';

export const AuthorZodSchema = z.object({
    fullName: z.string()
        .min(1, { message: "El nombre completo es requerido" })
        .max(100, { message: "El nombre completo no puede exceder 100 caracteres" })
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: "El nombre solo puede contener letras y espacios" }),

    biography: z.string()
        .min(10, { message: "La biografía debe tener al menos 10 caracteres" })
        .max(2000, { message: "La biografía no puede exceder 2000 caracteres" }),

    profession: z.string()
        .min(1, { message: "La profesión es requerida" })
        .max(100, { message: "La profesión no puede exceder 100 caracteres" }),

    birthdate: z.union([
        z.string()
            .datetime({ message: "La fecha debe tener un formato válido" })
            .refine((val) => new Date(val) <= new Date(), {
                message: "La fecha de nacimiento no puede ser futura"
            }),
        z.date()
            .refine((val) => val <= new Date(), {
                message: "La fecha de nacimiento no puede ser futura"
            })
    ]),

    birthplace: z.string()
        .min(1, { message: "El lugar de nacimiento es requerido" })
        .max(100, { message: "El lugar de nacimiento no puede exceder 100 caracteres" }),

    nationality: z.string()
        .min(1, { message: "La nacionalidad es requerida" })
        .max(50, { message: "La nacionalidad no puede exceder 50 caracteres" }),

    writingGenre: z.array(
        z.string()
            .min(1, { message: "Cada género no puede estar vacío" })
            .max(50, { message: "Cada género no puede exceder 50 caracteres" })
    )
        .min(1, { message: "Debe tener al menos un género literario" })
        .max(10, { message: "No puede tener más de 10 géneros literarios" })
});

// Tipo TypeScript
export const updataAuthorsZodSchema = z.object({
    fullName: z.string()
        .min(1, { message: "El nombre completo es requerido" })
        .max(100, { message: "El nombre completo no puede exceder 100 caracteres" })
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: "El nombre solo puede contener letras y espacios" })
        .optional(),

    biography: z.string()
        .min(10, { message: "La biografía debe tener al menos 10 caracteres" })
        .max(2000, { message: "La biografía no puede exceder 2000 caracteres" })
        .optional(),

    profession: z.string()
        .min(1, { message: "La profesión es requerida" })
        .max(100, { message: "La profesión no puede exceder 100 caracteres" })
        .optional(),

    birthdate: z.union([
        z.string()
            .datetime({ message: "La fecha debe tener un formato válido" })
            .refine((val) => new Date(val) <= new Date(), {
                message: "La fecha de nacimiento no puede ser futura"
            }),
        z.date()
            .refine((val) => val <= new Date(), {
                message: "La fecha de nacimiento no puede ser futura"
            })
    ]).optional(),

    birthplace: z.string()
        .min(1, { message: "El lugar de nacimiento es requerido" })
        .max(100, { message: "El lugar de nacimiento no puede exceder 100 caracteres" })
        .optional(),

    nationality: z.string()
        .min(1, { message: "La nacionalidad es requerida" })
        .max(50, { message: "La nacionalidad no puede exceder 50 caracteres" })
        .optional(),

    writingGenre: z.array(
        z.string()
            .min(1, { message: "Cada género no puede estar vacío" })
            .max(50, { message: "Cada género no puede exceder 50 caracteres" })
    )
        .min(1, { message: "Debe tener al menos un género literario" })
        .max(10, { message: "No puede tener más de 10 géneros literarios" })
        .optional()
});
import z from "zod";


export const AuthorZodSchema = z.object({
    fullName: z.string().min(10, "El nombre completo es obligatorio"),
    biography: z.string().min(10, "La biografia es demasiado corta").optional(),
    profession: z.string().min(1, "La profesión es obligatoria"),
    birthdate: z.union([z.string(), z.date()]),
    birthplace: z.string().min(1, "El lugar de nacimiento es obligatorio"),
    nationality: z.string().min(1, "La nacionalidad es obligatoria"),
    writingGenre: z.array(z.string().min(1, "El género no puede estar vacío"))
});
export const AuthorUpdateZodSchema = z.object({
    fullName: z.string().min(10, "El nombre completo es obligatorio").optional(),
    biography: z.string().min(10, "La biografia es demasiado corta").optional(),
    profession: z.string().min(1, "La profesión es obligatoria").optional(),
    birthdate: z.union([z.string(), z.date()]).optional(),
    birthplace: z.string().min(1, "El lugar de nacimiento es obligatorio").optional(),
    nationality: z.string().min(1, "La nacionalidad es obligatoria").optional(),
    writingGenre: z.array(z.string().min(1, "El género no puede estar vacío")).optional()
});

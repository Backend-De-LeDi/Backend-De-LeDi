import { AuthorZodSchema } from "./authZodSchema";

export function validarAuthor(data: any) {
    const parsed = AuthorZodSchema.safeParse(data);

    if (!parsed.success) {
        console.log("Errores de validación:", parsed.error.errors);

        return {
            success: false,
            message: "Datos de usuario inválidos",
            errors: parsed.error.errors.map(error => ({
                field: error.path.join('.'),
                message: error.message
            })),
            status: 400
        };
    }

    return {
        success: true,
        data: parsed.data,
        status: 200
    };
}
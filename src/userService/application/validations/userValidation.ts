import { UserZodSchema } from "./userZodSchema";

export function validarUsuario(data: any) {
    const parsed = UserZodSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            message: "Datos de usuario inválidos",
            errors: parsed.error.errors,
            status: 400
        };
    }

    return parsed.data;
}
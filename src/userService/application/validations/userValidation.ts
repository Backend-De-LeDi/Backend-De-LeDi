import { UserZodSchema } from "./userZodSchema";
import { ZodError } from "zod";

export function validarUsuario(data: any) {
    const parsed = UserZodSchema.safeParse(data);

    if (!parsed.success) {
        throw parsed.error;
    }

    return parsed.data;
}

// schemas/loginSchema.ts
import { z } from "zod";

export const RegisterSchema = z.object({
    userName: z.string(),
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8, { message: "Too short." })
});


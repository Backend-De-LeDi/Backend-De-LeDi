import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, { message: "El título es obligatorio" }),
  descriptions: z.string().min(1, { message: "La descripción es obligatoria" }),
  category: z.array(z.string()).nonempty({ message: "Debe haber al menos una categoría" }),
  available: z.boolean().refine((val) => typeof val === "boolean", {
    message: "El campo 'available' debe ser un booleano (true o false)",
  }),
  language: z.string().min(1, { message: "El idioma es obligatorio" }),
  summary: z.string().min(1, { message: "El resumen es obligatorio" }),
});

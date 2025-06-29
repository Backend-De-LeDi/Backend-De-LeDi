import { z } from "zod";
import { Types } from "mongoose";

const isObjectId = (val: unknown): val is Types.ObjectId => val instanceof Types.ObjectId;

export const bookSchema = z.object({
  title: z.string().min(1, { message: "El título es obligatorio" }),
  descriptions: z.string().min(1, { message: "La descripción es obligatoria" }),
  subgenre: z.array(z.string()).nonempty({ message: "Debe haber al menos un subgénero" }),
  available: z.boolean().refine((val) => typeof val === "boolean", {
    message: "El campo 'available' debe ser un booleano (true o false)",
  }),
  language: z.string().min(1, { message: "El idioma es obligatorio" }),
  genreType: z.string().min(1, { message: "el genero principal es obligatorio " }),
  author: z
    .array(
      z.union([
        z.string().regex(/^[0-9a-fA-F]{24}$/),
        z.custom<Types.ObjectId>(isObjectId, {
          message: "Se esperaba un ObjectId o una cadena válida.",
        }),
      ])
    )
    .nonempty({
      message: "Este campo requiere uno o más autores o autoras. No puede quedar vacío.",
    }),
});

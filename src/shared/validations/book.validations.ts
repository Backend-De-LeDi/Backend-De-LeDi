import { z } from "zod";
import { Types } from "mongoose";

const isObjectId = (val: unknown): val is Types.ObjectId => val instanceof Types.ObjectId;

// ? validaciones de los campos de libro
export const bookSchema = z.object({
  title: z
    .string({ message: "el titulo no puede ser un numero " })
    .min(1, { message: "El título es obligatorio" })
    .max(100, { message: "un titulo solo puede tener 100 caracteres" }),

  summary: z.string({ message: "la descripción no puede ser un numero" }).min(1, { message: "La descripción es obligatoria" }).max(2500, {
    message: "el limite de caracteres que puede tener una descripción es de 4000 caracteres",
  }),

  subgenre: z
    .array(
      z.string({ message: "los subgénero no pueden ser de valores numérico" }).max(50, {
        message: "un subgénero solo puede tener 50 caracteres como máximo",
      })
    )
    .nonempty({ message: "Debe haber al menos un subgénero" }),

  available: z.boolean().refine((val) => typeof val === "boolean", {
    message: "El campo debe ser un valor de verdad si es valido o no",
  }),

  language: z
    .string()
    .min(1, { message: "El idioma es obligatorio" })
    .max(3, {
      message: `
    debe ingresar las siglas del idioma, 
    Ejemplo:
    'es': español,
    'en': ingles`,
    }),

  theme: z.array(z.string().max(50, { message: "un tema solo puede tener 50 caracteres como máximo" })).nonempty({
    message: "Debe haber al menos un tema",
  }),

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

  synopsis: z
    .string({ message: "la sinopsis no puede ser un numero" })
    .min(1, { message: "La sinopsis es obligatoria" })
    .max(800, { message: "el limite de caracteres que puede tener una sinopsis es de 4000 caracteres" }),

  genre: z
    .string({ message: "el genero no puede ser un numero" })
    .min(1, { message: "El género es obligatorio" })
    .max(50, { message: "un genero solo puede tener 50 caracteres como máximo" }),

  level: z
    .string({ message: "el nivel no puede ser un numero" })
    .min(1, { message: "El nivel es obligatorio" })
    .max(50, { message: "un nivel solo puede tener 50 caracteres como máximo" }),

  format: z
    .string({ message: "el formato no puede ser un numero" })
    .min(1, { message: "El formato es obligatorio" })
    .max(20, { message: "un formato solo puede tener 20 caracteres como máximo" }),
});

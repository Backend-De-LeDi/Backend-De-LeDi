import { z } from "zod";
import { Types } from "mongoose";

const isObjectId = (val: unknown): val is Types.ObjectId => val instanceof Types.ObjectId;

export const bookSchema = z.object({
  // * validaciones para el titulo

  title: z
    .string({ message: "el titulo no puede ser un numero " })
    .min(1, { message: "El título es obligatorio" })
    .max(100, { message: "un titulo solo puede tener 100 caracteres" }),

  // * --------------------------------------------------------------------------------------------

  // * validaciones para la descripción

  summary: z.string({ message: "la descripción no puede ser un numero" }).min(1, { message: "La descripción es obligatoria" }).max(2500, {
    message: "el limite de caracteres que puede tener una descripción es de 4000 caracteres",
  }),

  // * --------------------------------------------------------------------------------------------

  // * validaciones del campo subgénero

  subgenre: z
    .array(
      z.string({ message: "los subgénero no pueden ser de valores numérico" }).max(50, {
        message: "un subgénero solo puede tener 50 caracteres como máximo",
      })
    )
    .nonempty({ message: "Debe haber al menos un subgénero" }),

  // * --------------------------------------------------------------------------------------------

  // * validación de estado del libro si es valido o no en la plataforma

  available: z.boolean().refine((val) => typeof val === "boolean", {
    message: "El campo debe ser un valor de verdad si es valido o no",
  }),

  // * --------------------------------------------------------------------------------------------

  // * validación de idioma del libro
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

  // * --------------------------------------------------------------------------------------------

  // * validación de tipo de tema

  theme: z
    .array(
      z.string().max(50, {
        message: "un tema solo puede tener 50 caracteres como máximo",
      })
    )
    .nonempty({
      message: "Debe haber al menos un tema",
    }),

  // * --------------------------------------------------------------------------------------------

  // * validación de la id del author, referencias entre autor con libro

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

  // * --------------------------------------------------------------------------------------------

  // * validación de sinopsis del libro
  synopsis: z.string({ message: "la sinopsis no puede ser un numero" }).min(1, { message: "La sinopsis es obligatoria" }).max(800, {
    message: "el limite de caracteres que puede tener una sinopsis es de 4000 caracteres",
  }),
  // * --------------------------------------------------------------------------------------------

  // * validación de genero del libro
  genre: z
    .string({ message: "el genero no puede ser un numero" })
    .min(1, { message: "El género es obligatorio" })
    .max(50, { message: "un genero solo puede tener 50 caracteres como máximo" }),
  // * --------------------------------------------------------------------------------------------

  // * validación de nivel del libro
  level: z
    .string({ message: "el nivel no puede ser un numero" })
    .min(1, { message: "El nivel es obligatorio" })
    .max(50, { message: "un nivel solo puede tener 50 caracteres como máximo" }),

  // * --------------------------------------------------------------------------------------------
  });

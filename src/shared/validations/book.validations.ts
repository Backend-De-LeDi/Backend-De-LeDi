import { z } from "zod";
import { Types } from "mongoose";

const isObjectId = (val: unknown): val is Types.ObjectId =>
  val instanceof Types.ObjectId;

export const bookSchema = z.object({
  
  // * validaciones para el titulo

  title: z
    .string({ message: "el titulo no puede ser un numero " })
    .min(1, { message: "El título es obligatorio" })
    .max(100, { message: "un titulo solo puede tener 100 caracteres" }),

  // * --------------------------------------------------------------------------------------------

  // * validaciones para la descripción

  descriptions: z
    .string({ message: "la descripción no puede ser un numero" })
    .min(1, { message: "La descripción es obligatoria" })
    .max(4000, {
      message:
        "el limite de caracteres que puede tener una descripción es de 4000 caracteres",
    }),

  // * --------------------------------------------------------------------------------------------

  // * validaciones del campo subgénero

  subgenre: z
    .array(
      z
        .string({ message: "los subgénero no pueden ser de valores numérico" })
        .max(50, {
          message: "un subgénero solo puede tener 50 caracteres como máximo",
        })
    )
    .nonempty({ message: "Debe haber al menos un subgénero" }),

  // * --------------------------------------------------------------------------------------------

  // * validación de estado del libro si es valido o no en la plataforma

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

  // * --------------------------------------------------------------------------------------------

  // * validación de tipo de genero principal

  genreType: z
    .string()
    .min(1, { message: "el genero principal es obligatorio " })
    .max(50, {
      message:
        "el máximo de caracteres que puede tener el genero principal es de 50",
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
      message:
        "Este campo requiere uno o más autores o autoras. No puede quedar vacío.",
    })

  // * --------------------------------------------------------------------------------------------
});

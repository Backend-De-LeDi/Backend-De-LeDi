import { z } from "zod";

export const createYourHistoModel = z.object({
  title: z.string().min(1, "titulo del juego ").describe("el titulo debe ser simpre el original "),
  scenery: z
    .string()
    .min(1, "El escenario debe tener contenido narrativo")
    .describe("Texto narrativo que representa el contenido del escenario de 200 caracteres"),
  page: z
    .number()
    .min(1, "Número mínimo de página")
    .max(10, "Número máximo de página")
    .describe("Número de página del cuento en la que se ubica este escenario"),
  options: z
    .array(
      z.object({
        textOption: z.string().min(1, "Las opciones son obligatorias para pasar al siguiente escenario"),
        score: z
          .number()
          .min(20, "La puntuación mínima es 0")
          .max(100, "La puntuación máxima es 100")
          .describe("Puntuación que obtendrá el usuario si responde correctamente a la opción elegida"),
      })
    )
    .length(2, "Debe haber exactamente dos opciones dentro del escenario")
    .describe("Opciones narrativas embebidas en el escenario"),
});

export const final = z.object({
  title: z.string().min(1, "titulo del juego ").describe("el titulo debe ser simpre el original "),
  scenery: z
    .string()
    .min(1, "El escenario debe tener contenido narrativo")
    .describe("Texto narrativo que representa el contenido del escenario"),
  page: z
    .number()
    .min(1, "Número mínimo de página")
    .max(10, "Número máximo de página")
    .describe("Número de página del cuento en la que se ubica este escenario"),
  completed: z.boolean().describe("se debe marcar en true para completarlo osea que es el final de la historia "),
});

export const quizModel = z.object({
  title: z.string().min(1, "titulo del juego ").describe("el titulo debe ser simpre el original "),
  scenery: z.string().min(1, "El escenario debe tener contenido narrativo").describe("Texto narrativo que representa el contenido del escenario"),
  page: z.number().min(1, "Número mínimo de página").max(10, "Número máximo de página").describe("Número de página del cuento en la que se ubica este escenario"),
  options: z.array(
    z.object({
      textOption: z.string().min(1, "Las opciones son obligatorias para pasar al siguiente escenario"),
      status: z.boolean().describe("marca si la opción es correcta o no"),
      score: z.number().min(0, "El puntaje mínimo por opción es 0").max(100, "El puntaje máximo por opción es 100").describe("Puntaje asociado a esta opción"),
    })
  ).length(4, "Debe haber exactamente cuatro opciones dentro del escenario").describe("Opciones de preguntas embebidas en el escenario"),
});

export const finalQuiz = z.object({
  textCompleted: z
    .string()
    .min(1, " texto de felicitaciones ")
    .describe("texto de felicitaciones por completar el quiz "),
  title: z.string().min(1, "titulo del juego ").describe("el titulo debe ser simpre el original "),
  completed: z.boolean().describe("se debe maracar en true para completarlo"),
});

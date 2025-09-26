import { z } from "zod";

export const createYourHistoModel = z.object({
     ecenarys: z.string().min(1, "El escenario debe tener contenido narrativo").describe(
          "Texto narrativo que representa el contenido del escenario"
     ),
     page: z.number().min(1, "Número mínimo de página").max(10, "Número máximo de página").describe(
          "Número de página del cuento en la que se ubica este escenario"
     ),
     options: z
          .array(
               z.object({
                    textOption: z.string().min(1, "Las opciones son obligatorias para pasar al siguiente escenario"),
               })
          )
          .length(2, "Debe haber exactamente dos opciones dentro del escenario")
          .describe("Opciones narrativas embebidas en el escenario"),
});
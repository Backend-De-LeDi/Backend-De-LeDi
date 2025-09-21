import z from "zod"
const ecenary = z.object({
     id: z.string().min(1, "Los escenarios deben tener un ID único").describe(
          "Identificador único del escenario narrativo dentro de la estructura"
     ),
     text: z.string().min(1, "El escenario debe tener contenido narrativo").describe(
          "Texto narrativo que representa el contenido del escenario"
     ),
     v: z.string().min(1, "El escenario debe tener una versión").describe(
          "Versión narrativa del escenario. Ejemplo: v1 para historia original, v2 para alternativa, etc."
     ),
     page: z.number().min(1, "Número mínimo de página").max(10, "Número máximo de página").describe(
          "Número de página del cuento en la que se ubica este escenario"
     ),
})
const idEcenary = z.string().min(1, "Las opciones deben tener un ID único").describe("esta identificador identifica el ecenario de donde salio ");

const option = z.object({
     idEcenary: idEcenary,
     textOption: z.string().min(1, "las opciones son obligatoria para pasar al siguente ecenario "),
     idNextEcenary: z.string().min(1, "Las opciones deben tener la id del sigueinte ecenario al que apuntan").describe("cada id next apunta al siguinte ecenario"),
     v: z.string().min(1, "cada opcion debe tener una versión").describe(
          "Versión narrativa de las opciones. Ejemplo: v1 para historia original, v2 para alternativa, etc."
     ),
})


const final = z.object({
     idOptions: z.array(idEcenary).min(1, "almenos debe tener la opcion o opciones que se tomo para obtener este final"),
     textFinal: z.string().min(1, "este es el final de la historia en base a las opciones que se tomo")
})

export const createYourHistoModel = z.object({
     title: z.string().min(1, "titulo del cuento en forma de juego. Ejemplo:crea tu propia historia en base al cuento").describe(
          "debes usar el titulo orignal pero de una forma carismatica "
     ),
     ecenarys: z.array(ecenary).min(1, "Debe haber al menos un escenario por página").describe(
          "Conjunto de escenarios narrativos escalonados por página y versión"
     ),
     options: z.array(option).min(2, "Debe haber al menos 2 opciones por ecenario un  por página").describe(
          "Conjunto de opciones narrativas que conectan los escenarios entre sí. Cada opción debe contener el ID del escenario destino al que se dirige la decisión del lector."
     ),
     finalys: z.array(final).min(2, "la cantidad de finales es igual a la cantida de opciones finales").describe(
          "Conjunto de finales narrativos alcanzados según las opciones tomadas. Cada final agrupa las opciones que lo desencadenaron y el texto final correspondiente."
     )
});

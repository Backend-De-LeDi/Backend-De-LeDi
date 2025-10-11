import { createClient } from "@supabase/supabase-js";
import ENV from "../../shared/config/configEnv";
import { ISaveWritingGenre } from "../domain/writingGenreRepo";

const supabaseUrl = ENV.URL_SUPABASE;
const supabaseKey = ENV.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) throw new Error("Supabase URL or Key is not defined in environment variables");
const supabase = createClient(supabaseUrl, supabaseKey);


export class WritingGenresSupabaseRepo implements ISaveWritingGenre {

     async saveWritingGenre(geners: string[]): Promise<any[]> {
          try {

               const { data: existingGenresData, error: fetchError } = await supabase
                    .from('writingGenre')
                    .select('id, genre')

               if (fetchError) {
                    console.error("Error al obtener géneros existentes:", fetchError);
                    return []
               }

               const existingGenres = existingGenresData.map(item => item.genre);

               const genresToInsert = geners.filter(genre => !existingGenres.includes(genre));


               const results: any[] = await Promise.all(genresToInsert.map(async (genre) => {
                    const { data, error } = await supabase
                         .from('writingGenre')
                         .insert([{ genre }])
                         .select("*");

                    if (error) {
                         console.error("Error al insertar:", error);
                         []
                    }
                    return data?.[0].id;
               }));

               if (results.length === 0 && existingGenresData) {
                    const existingData = existingGenresData.filter(item => geners.includes(item.genre));
                    return existingData.map(item => item.id);
               }

               return results;

          } catch (error) {
               console.error("Error en saveWritingGenre:", error);
               return []
          }
     };
};

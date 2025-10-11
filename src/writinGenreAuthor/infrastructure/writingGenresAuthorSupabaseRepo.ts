import { createClient } from "@supabase/supabase-js";
import ENV from "../../shared/config/configEnv";
import { ISaveWritingGenreAuthor } from "../domain/writingGenreRepo";

const supabaseUrl = ENV.URL_SUPABASE;
const supabaseKey = ENV.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) throw new Error("Supabase URL or Key is not defined in environment variables");
const supabase = createClient(supabaseUrl, supabaseKey);


export class WritingGenresSupabaseRepo implements ISaveWritingGenreAuthor {

     async saveWritingGenreAuthor(paramas: { idAuthor: number, idWritingGenre: number[] }): Promise<void> {

          try {
               const { idAuthor, idWritingGenre } = paramas;
               idWritingGenre.forEach(async (idGenre) => {
                    const { data, error } = await supabase
                         .from('authorWritingGenre')
                         .insert([{ idAuthors: idAuthor, idWritingGenres: idGenre }]);
                    if (error) {
                         console.error("Error al insertar:", error);
                         throw new Error("Supabase insert error: " + error.message);
                    }
               });

          } catch (error) {
               console.error("Error en saveWritingGenreAuthor:", error);
               throw error;
          }
     };
};

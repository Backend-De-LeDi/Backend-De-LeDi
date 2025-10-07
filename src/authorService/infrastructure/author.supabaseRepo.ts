import { createClient } from "@supabase/supabase-js";
import ENV from "../../shared/config/configEnv";
import { ISaveAuthorRepository } from "../domain/ports/saveAuthorRepository";
import { Author } from "../domain/entidades/author.Types";

const supabaseUrl = ENV.URL_SUPABASE;
const supabaseKey = ENV.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) throw new Error("Supabase URL or Key is not defined in environment variables");

const supabase = createClient(supabaseUrl, supabaseKey);

export class AuthorSupabaseRepo implements ISaveAuthorRepository {
  async crateAuthor(author: Author): Promise<Author> {
    const { data, error } = await supabase.from("author").insert([author]).select("*");

    if (error) {
      console.error("Error al insertar:", error);
      throw new Error("Supabase insert error: " + error.message);
    }

    return data?.[0];
  }
}

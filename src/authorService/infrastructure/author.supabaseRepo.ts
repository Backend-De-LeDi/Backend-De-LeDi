import { createClient } from "@supabase/supabase-js";
import ENV from "../../shared/config/configEnv";
import { ISaveAuthorRepository } from "../domain/ports/saveAuthorRepository";
import { Author } from "../domain/entidades/author.Types";
import saveWritingGenre from "../../writingGenre/helpers/saveWritingGenre";
import { number } from "zod";

const supabaseUrl = ENV.URL_SUPABASE;
const supabaseKey = ENV.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) throw new Error("Supabase URL or Key is not defined in environment variables");

const supabase = createClient(supabaseUrl, supabaseKey);

export class AuthorSupabaseRepo implements ISaveAuthorRepository {

  async createAuthor(author: Author): Promise<(Author & number[])[]> {
    const newAuthor = {
      idMongo: author._id,
      biography: author.biography,
      profession: author.profession,
      birthdate: author.birthdate,
      birthplace: author.birthplace,
      nationality: author.nationality,
      fullName: author.fullName,
    }

    let genres: number[] = [];

    if (author.writingGenre && author.writingGenre.length > 0) {
      genres = await saveWritingGenre.run(author.writingGenre);
    }

    const { data, error } = await supabase.from("author").insert([newAuthor]).select("*");

    if (error) {
      console.error("Error al insertar:", error);
      throw new Error("Supabase insert error: " + error.message);
    }
    const authorData = { ...data?.[0], _id: data[0].id };
    return [authorData, genres] as (Author & number[])[];
  }

  async deleteAuthor(id: any): Promise<void> {
    await supabase.from("author").delete().eq("idMongo", id);
  }
}

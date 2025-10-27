import { DocumentsRepository } from "../domain";
import { createClient } from "@supabase/supabase-js";
import ENV from "../../shared/config/configEnv";
import { Types } from "mongoose";
import { BookModel } from "../../books/infrastructure/model/books.model";
import { AuthorModel } from "../../authorService/infrastructure/models/authores.Model";
import { EmbeddingApps } from "../applications";
import { EmbeddingDriver } from "./embedding.driver";
import { BookDetail } from "../../shared/types/bookTypes/bookTypes";


const supabaseBooks = createClient(ENV.URL_SUPABASE[0]!, ENV.SUPABASE_KEY[0]!);
const supabaseAuthors = createClient(ENV.URL_SUPABASE[1]!, ENV.SUPABASE_KEY[1]!);

const repoEmbedding = new EmbeddingDriver()
const appEmbedding = new EmbeddingApps(repoEmbedding)


export class DocumentsDrivers implements DocumentsRepository {
     async insertBookToDocuments(bookId: Types.ObjectId): Promise<void> {
          const book = await BookModel.findById(bookId);
          if (!book || !book.author || book.author.length === 0) return;

          const authorDocs = await AuthorModel.find({ _id: { $in: book.author } });
          const authorsData = authorDocs.map((a) => ({
               author_mongo_id: a._id.toString(),
               author_full_name: a.fullName,
          }));

          const textForEmbedding = [book.title, book.summary, book.synopsis, ...authorsData.map((a) => a.author_full_name)]
               .filter(Boolean)
               .join(". ");

          const embedding = await appEmbedding.create768(textForEmbedding);
          const content = textForEmbedding;

          const metadata = {
               id_mongo: book._id,
               title: book.title,
               summary: book.summary,
               synopsis: book.synopsis,
               subgenre: book.subgenre,
               language: book.language,
               available: book.available,
               year_book: book.yearBook,
               theme: book.theme,
               total_pages: book.totalPages,
               genre: book.genre,
               level: book.level,
               format: book.format,
               file_extension: book.fileExtension,
               authors: authorsData,
          };

          const { error } = await supabaseBooks.from("documents").insert({ content, metadata, embedding });

          console.log("✅ autor almacenado correctamente en la base de datos vectorial");
          if (error) {
               console.error("Error insertando documento:", error);
          }
     }

     async insertAuthorToDocuments(authorId: Types.ObjectId): Promise<void> {
          const author = await AuthorModel.findById(authorId);
          if (!author) return;

          const books = (await BookModel.find({}).populate("author")) as (BookDetail & { _id: Types.ObjectId })[];

          const libros = books.map((b) => ({
               id_mongo: b._id.toString(),
               title: b.title,
          }));

          const textForEmbedding = [
               author.fullName,
               author.biography,
               author.profession,
               author.birthdate?.toString().split("T")[0],
               author.birthplace,
               author.nationality,
               ...(author.writingGenre || []),
               ...(libros.map((l) => l.title) || [""]),
               ,
          ]
               .filter(Boolean)
               .join(". ");

          const embedding = await appEmbedding.create768(textForEmbedding);
          const content = textForEmbedding;

          const metadata = {
               id_mongo: author._id.toString(),
               full_name: author.fullName,
               biography: author.biography,
               profession: author.profession,
               birthdate: author.birthdate,
               birthplace: author.birthplace,
               nationality: author.nationality,
               writing_genre: author.writingGenre,
               books: libros || [],
          };

          const { error } = await supabaseAuthors.from("documents").insert({
               content,
               metadata,
               embedding,
          });

          console.log("✅ autor almacenado correctamente en la base de datos vectorial");

          if (error) {
               console.error("Error insertando autor:", error.message);
          }
     }

     async deleteBookFromDocuments(bookId: string): Promise<void> {
          const { error } = await supabaseAuthors.from("documents").delete().eq("metadata->>id_mongo", bookId.toString()); // ← clave literal en metadata

          if (error) {
               console.error("Error eliminando documento:", error);
          }
     }

     async deleteAuthorFromDocuments(idAuthor: string): Promise<void> {
          const { error } = await supabaseAuthors.from("documents").delete().eq("metadata->>id_mongo", idAuthor.toString()); // ← clave literal en metadata

          if (error) {
               console.error("Error eliminando documento:", error);
          }
     }
}
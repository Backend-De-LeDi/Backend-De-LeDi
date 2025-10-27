import { AIRepository } from "../domain/services/AIRepository";
import { generateEmbedding } from "../../shared/utils/loadModel";
import { EmbeddingModel } from "./model/embeddingModel";
import { Types } from "mongoose";
import { cosineSimilarity } from "../../shared/utils/simility";
import { zodResponseFormat } from "openai/helpers/zod";
import { createYourHistoModel, final } from "./schemas/games";
import { BookContentModel } from "../../bookContent/infrastructure/model/BookContentModel";
import { ContentBookLiteral, Gamble, Quiz } from "../../shared/types/gamesTypes/gameTypes";
import { PromptFactory, PromptQuizFactory } from "../../shared/config/const/prompt";
import { PromptSystem, PromptSystemQuiz } from "../../shared/class/promptSystem";
import { separator } from "../../shared/utils/consoleSeparator";
import { SessionRecord } from "../domain/entities/SessionRecord";
import { SessionRecordModel } from "./model/sessionRecordModel";
import { quizModel } from "./schemas/games";
import { finalQuiz } from "./schemas/games";
import { BookModel } from "../../books/infrastructure/model/books.model";
import { AuthorModel } from "../../authorService/infrastructure/models/authores.Model";
import { createClient } from "@supabase/supabase-js";
import ENV from "../../shared/config/configEnv";
import { generateEmbeddingForAi } from "../../shared/utils/generateEmbedding";
import { BookDetail } from "../../shared/types/bookTypes/bookTypes";
import { TempHistoryGame } from "./model/tempHistoryGame";
import OpenAI from "openai";

const supabaseBooks = createClient(ENV.URL_SUPABASE[0]!, ENV.SUPABASE_KEY[0]!);
const supabaseAuthors = createClient(ENV.URL_SUPABASE[1]!, ENV.SUPABASE_KEY[1]!);

export class ConnectionAI implements AIRepository {
  private openai = new OpenAI({
    apiKey: ENV.GEMINI_API_KEY,
    baseURL: ENV.URL_GEMINI,
  });

  async getIdsForRecommendation(userBookIds: string[]): Promise<string[]> {
    const filtered = await EmbeddingModel.find({ bookId: { $in: userBookIds } });

    if (filtered.length === 0) return [];

    const targetEmbedding = filtered[0].embedding;

    const allEmbeddings = await EmbeddingModel.find({});

    const scored = allEmbeddings
      .filter((doc) => !userBookIds.includes(doc.bookId.toString()))
      .map((doc) => ({
        id: doc.bookId.toString(),
        score: cosineSimilarity(targetEmbedding, doc.embedding),
      }))
      .sort((a, b) => b.score - a.score);

    return scored.map((s) => s.id);
  }

  async createEmbedding(id: Types.ObjectId, title: string, summary: string, synopsis: string): Promise<void> {
    try {
      const text = `${title}. ${summary} ${synopsis}`;
      const vector = await generateEmbedding(text);
      await EmbeddingModel.create({ bookId: id, embedding: vector });
    } catch (err) {
      console.error("Error al crear el embedding:", err);
    }
  }

  async createYourHistoryGame(idBook: string, gamble: Gamble | undefined): Promise<any | void> {
    try {
      const idValid = new Types.ObjectId(idBook);
      const [contentBook] = await BookContentModel.find({ bookId: idValid }, { title: 1, text: 1, _id: 0 });

      const contentBookLiteral: ContentBookLiteral = {
        title: contentBook.title,
        text: contentBook.text.map((entry) => entry.content),
      };
      const isInitial = gamble === undefined;
      const page = isInitial ? 0 : gamble.page;
      const outOfBounds = page >= contentBook.text.length;

      const promptUser = PromptFactory.create(gamble, contentBookLiteral);
      const promptSystem = PromptSystem.getIntancia();

      const completion = await this.openai.chat.completions.parse({
        model: "gemini-2.5-flash-lite",
        temperature: 1.0,
        messages: [
          { role: "system", content: promptSystem.prompt },
          { role: "user", content: promptUser },
        ],
        response_format: zodResponseFormat(outOfBounds ? final : createYourHistoModel, "event"),
      });

      const event = completion.choices[0].message.parsed;

      return event;
    } catch (error) {
      separator();
      console.log(error);
      separator();
    }
  }

  async quiz(idBook: string, quiz: Quiz): Promise<any> {
    try {
      const idValid = new Types.ObjectId(idBook);
      const [contentBook] = await BookContentModel.find({ bookId: idValid }, { title: 1, text: 1, _id: 0 });

      const contentBookLiteral: ContentBookLiteral = {
        title: contentBook.title,
        text: contentBook.text.map((entry) => entry.content),
      };

      const InitialQuiz = quiz === undefined;
      const page = InitialQuiz ? 0 : quiz.page;
      const outOfBounds = page >= contentBook.text.length;

      const promptUser = PromptQuizFactory.create(quiz, contentBookLiteral);
      const promptSystem = PromptSystemQuiz.getIntancia();

      const completion = await this.openai.chat.completions.parse({
        model: "gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: promptSystem.prompt },
          { role: "user", content: promptUser },
        ],
        response_format: zodResponseFormat(outOfBounds ? finalQuiz : quizModel, "event"),
      });

      const event = completion.choices[0].message.parsed;
      return event;
    } catch (error) {
      separator();
      console.log(error);
      separator();
    }
  }

  async getAllVectorStoresMemoryByIdUser(idUser: Types.ObjectId): Promise<SessionRecord[]> {
    return await SessionRecordModel.find({ idUser });
  }

  async getAllVectorStoreMemoryByIdSession(idSeccion: string): Promise<SessionRecord[]> {
    return await SessionRecordModel.find({ idSeccion });
  }

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

    const embedding = await generateEmbeddingForAi(textForEmbedding);
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
      authors: authorsData, // ← nombre + ID Mongo
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

    const embedding = await generateEmbeddingForAi(textForEmbedding);
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

import { AIRepository } from "../domain/services/AIRepository";
import { generateEmbedding } from "../../shared/utils/loadModel";
import { EmbeddingModel } from "./model/embeddingModel";
import { Types } from "mongoose";
import { cosineSimilarity } from "../../shared/utils/simility";
import { zodResponseFormat } from "openai/helpers/zod";
import { openai } from "../domain/models/model";
import { createYourHistoModel, final } from "./model/createYourHistoModel";
import { BookContentModel } from "../../bookContent/infrastructure/model/BookContentModel";
import { ContentBookLiteral, Gamble, Quiz } from "../../shared/types/gamesTypes/createYourHistory";
import { PromptFactory, PromptQuizFactory } from "../../shared/config/const/prompt";
import { PromptSystem, PromptSystemQuiz } from "../../shared/class/promptSystem";
import { separator } from "../../shared/utils/consoleSeparator";
import { VectorStoreMemory } from "../domain/entities/vectorStoreMemory";
import { VectorStoreMemoryModel } from "./model/vectorStoresMemory";
import { quizModel } from "./model/createYourHistoModel";
import { finalQuiz } from "./model/createYourHistoModel";
import { BookModel } from "../../books/infrastructure/model/books.model";
import { AuthorModel } from "../../authorService/infrastructure/models/authores.Model";
import { createClient } from "@supabase/supabase-js"
import ENV from "../../shared/config/configEnv";
import { generateEmbeddingForAi } from "../../shared/utils/generateEmbedding";

const supabase = createClient(ENV.URL_SUPABASE!, ENV.SUPABASE_KEY!);

export class ConnectionAI implements AIRepository {
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

      const completion = await openai.chat.completions.parse({
        model: "gemini-2.5-flash-lite",
        temperature: 0.7,
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

      const completion = await openai.chat.completions.parse({
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

  async createVectorStoreMemory(data: VectorStoreMemory): Promise<void> {
    const isChat = await VectorStoreMemoryModel.findOne({ idSeccion: data.idSeccion });

    if (isChat) {
      await VectorStoreMemoryModel.findByIdAndUpdate(isChat._id, {
        $push: { conversation: { $each: data.conversation } },
      });
    } else {
      const newChat = new VectorStoreMemoryModel({
        idUser: data.idUser,
        idSeccion: data.idSeccion,
        conversation: data.conversation,
      });
      await newChat.save();
    }
  }

  async getAllVectorStoresMemoryByIdUser(idUser: Types.ObjectId): Promise<VectorStoreMemory[]> {
    return await VectorStoreMemoryModel.find({ idUser });
  }

  async getAllVectorStoreMemoryByIdSession(idSeccion: string): Promise<VectorStoreMemory[]> {
    return await VectorStoreMemoryModel.find({ idSeccion });
  }

  async chatBot(message: string): Promise<any> {
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: message,
        },
      ],
    });

    console.log(response.choices[0].message.content);

    return response.choices[0].message.content;
  }

  async insertBookToDocuments(bookId: Types.ObjectId): Promise<void> {
    const book = await BookModel.findById(bookId);
    if (!book || !book.author || book.author.length === 0) return;

    const authorDocs = await AuthorModel.find({ _id: { $in: book.author } });
    const authorsData = authorDocs.map(a => ({
      author_mongo_id: a._id.toString(),
      author_full_name: a.fullName
    }));

    const textForEmbedding = [
      book.title,
      book.summary,
      book.synopsis,
      ...authorsData.map(a => a.author_full_name)
    ].filter(Boolean).join(". ");

    const embedding = await generateEmbeddingForAi(textForEmbedding);
    const content = textForEmbedding;

    const metadata = {
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
      authors: authorsData // ← nombre + ID Mongo
    };

    const { error } = await supabase.from("documents").insert({ content, metadata, embedding });

    if (error) {
      console.error("Error insertando documento:", error);
    }
  }
}

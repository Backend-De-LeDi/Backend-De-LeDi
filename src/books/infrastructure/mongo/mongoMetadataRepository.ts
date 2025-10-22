import { BooksMetadataRepository } from "../../domain/booksMetadataRepository";
import { BookModel } from "../model/books.model";

export class MongoMetadataRepository implements BooksMetadataRepository {
     //  ✅
     async getAllThemes(): Promise<string[]> {
          const books = await BookModel.find({}, { theme: 1, _id: 0 });
          const themes = new Set<string>();

          books.forEach((book) => {
               book.theme.forEach((t: string) => themes.add(t));
          });

          return Array.from(themes);
     }

     //  ✅
     async getAllSubgenres(): Promise<string[]> {
          const books = await BookModel.find({}, { subgenre: 1, _id: 0 });
          const subgenres = new Set<string>();

          books.forEach((book) => {
               book.subgenre.forEach((s: string) => subgenres.add(s));
          });

          return Array.from(subgenres);
     }

     //  ✅
     async getAllGenres(): Promise<string[]> {
          const books = await BookModel.find({}, { genre: 1, _id: 0 });

          const genres = new Set<string>();

          books.forEach((book) => {
               if (book.genre) {
                    genres.add(book.genre);
               }
          });

          return Array.from(genres);
     }

     //  ✅
     async getAllYears(): Promise<string[]> {
          const books = await BookModel.find({}, { yearBook: 1, _id: 0 });

          const years = new Set<string>();

          books.forEach((book) => {
               years.add(book.yearBook);
          });
          return Array.from(years);
     }

     //  ✅
     async getAllFormats(): Promise<string[]> {
          return BookModel.distinct("format").exec();
     }

}
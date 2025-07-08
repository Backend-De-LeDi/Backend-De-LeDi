import { AudiobookModel } from "./model/audiobooks.model";
import { AudiobooksRepository } from "../domain/audiobooksRepository";
import { Audiobook } from "../domain/audiobooks";
import { Types } from "mongoose";
import { SearchedBook } from "../../types/bookTypes/bookTypes";
import { SearchedAudiobook } from "../../types/audiobookTypes/audiobookTypes";

// ? repositorio de mongo que implementa los métodos del repositorio guía: BooksRepository
export class MongoAudiobookRepository implements AudiobooksRepository {
  // ? método de repositorio que es para crear o almacenar un nuevo libro
  async createAudiobook(book: Audiobook): Promise<void> {
    // * almacenamos el libro que se recibió en el argumento en un modelo de mongoose
    const newBook = new AudiobookModel(book);

    // * guardamos en la base de datos
    await newBook.save();
  }

  // ? método para obtener todo los libros en la base de datos
  async getAllAudiobooks(): Promise<SearchedAudiobook[]> {
    // * realizamos la consulta find que es buscar sin ningún parámetro que es todo
    const books = await AudiobookModel.find();

    // * retornamos el array de libros
    return books;
  }

  // ? método para eliminar libro en la base de datos en base a su id
  async deleteAudiobook(id: Types.ObjectId): Promise<void> {
    // * hacemos eliminación del libro en la base de datos en base a la id del argumento del método
    await AudiobookModel.findOneAndDelete(id);
  }

  // ? método para obtener un libro en la base de datos en base a su id
  async getAudiobookById(id: Types.ObjectId): Promise<SearchedAudiobook | null> {
    // * buscamos el libro en base a id proporcionada en el argumentos
    const book: SearchedAudiobook | null = await AudiobookModel.findById(id);

    // * si no hay libro retornamos null
    if (!book) return null;

    // * si hay libro con la id proporcionada lo retornamos
    return book;
  }

  // ? método para obtener libros en la base de datos en base a una o varias palabras clave
  async getIntelligenceAudiobook(query: string): Promise<SearchedAudiobook[]> {
    //* búsqueda principal por autores
    let resBooks = await AudiobookModel.find({ title: { $regex: query, $options: "i" } });

    //!realizar la lógica mas adelante una ves que Jaqui termine el de el dominio de autores
    // if (resBooks.length === 0) {
    //   resBooks = await BookModel.find({ author: { $regex: query, $options: "i" } });
    // }

    //* búsqueda terciaria por descripción y Resumen
    if (resBooks.length === 0) {
      resBooks = await AudiobookModel.find({
        $or: [{ descriptions: { $regex: query, $options: "i" } }, { summary: { $regex: query, $options: "i" } }],
      });
    }

    // * retornamos los que se encontró en la query
    return resBooks;
  }

  // ? método que permite obtener libros en base a sus subgéneros
  async getAudiobooksBySubgenre(subgenre: string[]): Promise<SearchedAudiobook[]> {
    // * buscamos en los libros los subgéneros que se recibieron
    const books = await AudiobookModel.find({ subgenre: { $in: subgenre } });

    // * retornamos lo que se hallo
    return books;
  }

  // ? método que permite obtener el contenido del libro en base a su id
  async getContentAudiobookById(id: Types.ObjectId): Promise<string | null> {
    // * buscamos el libro con la id proporcionada
    const book: SearchedBook | null = await AudiobookModel.findById(id);

    // * si no encuentra libro retornara null
    if (!book) return null;

    // * sino retornara la url del libro
    return book.contentBook.url_secura;
  }

  // ? método que permite obtener libros en base a si genero principal
  async getAudiobookByTheme(theme: string[]): Promise<SearchedAudiobook[]> {
    // * buscamos en la base de datos los libros que tengan el tema que se recibió en el argumento
    const books = await AudiobookModel.find({ theme: { $in: theme } });

    // * retornamos los libros que se encontraron
    return books;
  }
}

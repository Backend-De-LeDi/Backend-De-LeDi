import { BookModel } from "./model/books.model";
import { BooksRepository } from "../domain/booksRepository";
import { Books } from "../domain/books";
import { Types } from "mongoose";
import { SearchedBook } from "../../types/bookTypes/bookTypes";

// ? repositorio de mongo que implementa los métodos del repositorio guía: BooksRepository
export class MongoBookRepository implements BooksRepository {
  // ? método de repositorio que es para crear o almacenar un nuevo libro
  async createBook(book: Books): Promise<void> {
    // * almacenamos el libro que se recibió en el argumento en un modelo de mongoose
    const newBook = new BookModel(book);

    // * guardamos en la base de datos
    await newBook.save();
  }

  // ? método para obtener todo los libros en la base de datos
  async getAllBooks(): Promise<SearchedBook[]> {
    // * realizamos la consulta find que es buscar sin ningún parámetro que es todo
    const books = await BookModel.find();

    // * retornamos el array de libros
    return books;
  }

  // ? método para eliminar libro en la base de datos en base a su id
  async deleteBook(id: Types.ObjectId): Promise<void> {
    // * hacemos eliminación del libro en la base de datos en base a la id del argumento del método
    await BookModel.findOneAndDelete(id);
  }

  // ? método para obtener un libro en la base de datos en base a su id
  async getBookById(id: Types.ObjectId): Promise<SearchedBook | null> {
    // * buscamos el libro en base a id proporcionada en el argumentos
    const book: SearchedBook | null = await BookModel.findById(id);

    // * si no hay libro retornamos null
    if (!book) return null;

    // * si hay libro con la id proporcionada lo retornamos
    return book;
  }

  // ? método para obtener libros en la base de datos en base a una o varias palabras clave
  async getIntelligenceBook(query: string): Promise<SearchedBook[]> {
    //* búsqueda principal por autores
    let resBooks = await BookModel.find({ title: { $regex: query, $options: "i" } });

    //!realizar la lógica mas adelante una ves que Jaqui termine el de el dominio de autores
    // if (resBooks.length === 0) {
    //   resBooks = await BookModel.find({ author: { $regex: query, $options: "i" } });
    // }

    //* búsqueda terciaria por descripción y Resumen
    if (resBooks.length === 0) {
      resBooks = await BookModel.find({
        $or: [{ descriptions: { $regex: query, $options: "i" } }, { summary: { $regex: query, $options: "i" } }],
      });
    }

    // * retornamos los que se encontró en la query
    return resBooks;
  }

  // ? método que permite obtener libros en base a sus subgéneros
  async getBooksBySubgenre(subgenre: string[]): Promise<SearchedBook[]> {
    // * buscamos en los libros los subgéneros que se recibieron
    const books = await BookModel.find({ subgenre: { $in: subgenre } });

    // * retornamos lo que se hallo
    return books;
  }

  // ? método que permite obtener el contenido del libro en base a su id
  async getContentBookById(id: Types.ObjectId): Promise<string | null> {
    // * buscamos el libro con la id proporcionada
    const book: SearchedBook | null = await BookModel.findById(id);

    // * si no encuentra libro retornara null
    if (!book) return null;

    // * sino retornara la url del libro
    return book.contentBook.url_secura;
  }

  // ? método que permite obtener libros en base a si genero principal
  async getBookByTheme(theme: string[]): Promise<SearchedBook[]> {
    // * buscamos en la base de datos los libros que tengan el tema que se recibió en el argumento
    const books = await BookModel.find({ theme: { $in: theme } });

    // * retornamos los libros que se encontraron
    return books;
  }

  async getAllBooksByLevel(nivel: string): Promise<SearchedBook[]> {
    if (nivel === "inicial") {
      const books = await BookModel.find({ level: { $in: ["inicial"] } });
      return books;
    } else if (nivel === "secundario") {
      const books = await BookModel.find({ level: { $in: ["secundario", "inicial"] } });
      return books;
    } else if (nivel === "joven adulto") {
      const books = await BookModel.find({ level: { $in: ["joven adulto", "secundario", "inicial"] } });
      return books;
    } else if (nivel === "adulto Mayor") {
      const books = await BookModel.find({ level: { $in: ["adulto Mayor", "joven adulto", "secundario", "inicial"] } });
      return books;
    }

    return await BookModel.find();
  }
}

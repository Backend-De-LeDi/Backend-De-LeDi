import { serviceContainer } from "../../../shared/services/serviceContainer";
import type { Request, Response } from "express";
import { UserModel } from "../../../userService/infrastructure/models/userModels";
import { BookProgressModel } from "../../../userPogressBooks/infrastructure/models/BookProgressModel";
import { BookModel } from "../../../books/infrastructure/model/books.model";
import { PreferenceTypes } from "../../../shared/types/preferenceTypes";
import mongoose from "mongoose";
import { SearchedBook } from "../../../shared/types/bookTypes/bookTypes";
import { sendBooksContent } from "../../../shared/utils/sendContentBooks";

// ? controlador que maneja las solicitudes de recomendaciones de libros
export class RecommendationsController {
  // ? maneja la solicitud para obtener recomendaciones de libros basadas en el progreso del usuario y sus preferencias ✅
  async getRecommendations(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).json({ msg: "necesitas acceso para realizar esta acción" });

    const userProgrese = await BookProgressModel.find({ idUser: user._id }).populate(["idBook", "idUser"]);

    if (userProgrese.length === 0) {
      const plainUser = user.toObject();
      const { category, format } = plainUser.preference as PreferenceTypes;
      const recommendations = await serviceContainer.recommendations.getBasicRecommendations.run(category, format);
      return res.status(200).json(recommendations);
    }

    const idsBooks = userProgrese.map((book) => {
      return book.idBook._id;
    });

    const books: SearchedBook[] = await serviceContainer.book.getBooksByIds.run(idsBooks);

    const plainBooks: SearchedBook[] = books.map((book) => book.toObject());

    const textsContent = plainBooks.map((book: SearchedBook) => {
      return [book.title, book.summary, book.subgenre.join(", "), book.language, book.synopsis, book.theme.join(", "), book.genre].join("\n");
    });

    const allBook = await sendBooksContent(textsContent);

    const recommendation = await serviceContainer.recommendations.getAdvancedRecommendations.run(idsBooks, allBook.ids);

    return res.status(200).json(recommendation);
  }
}

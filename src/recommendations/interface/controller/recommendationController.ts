import { serviceContainer } from "../../../shared/services/serviceContainer";
import type { Request, Response } from "express";
import { UserModel } from "../../../userService/infrastructure/models/userModels";
import { BookProgressModel } from "../../../userPogressBooks/infrastructure/models/BookProgressModel";
import { BookModel } from "../../../books/infrastructure/model/books.model";
import { PreferenceTypes } from "../../../shared/types/preferenceTypes";
import mongoose from "mongoose";

export class RecommendationsController {
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

    const idsBooks = userProgrese
      .map((book) => {
        const id = book.idBook?._id;
        return mongoose.Types.ObjectId.isValid(id) ? id : null;
      })
      .filter(Boolean);

    console.log(idsBooks);

    return res.status(200).json("usuario residido");
  }
}

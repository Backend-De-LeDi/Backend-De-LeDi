import { serviceContainer } from "../../../shared/services/serviceContainer";
import type { Request, Response } from "express";
import { UserModel } from "../../../userService/infrastructure/models/userModels";
import { BookProgressModel } from "../../../userPogressBooks/infrastructure/models/BookProgressModel";
import { BookModel } from "../../../books/infrastructure/model/books.model";
import { PreferenceTypes } from "../../../shared/types/preferenceTypes";

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

    // const idsBooks = userProgrese
    //   .map((book) => {
    //     const id = book.idBook?._id;
    //     return mongoose.Types.ObjectId.isValid(id) ? id : null;
    //   })
    //   .filter(Boolean);

    // const recommendationBase = await BookModel.find({ _id: { $in: idsBooks } });

    // const idsRecommendation = await sendBooks(recommendationBase);

    // const idsValid = idsRecommendation.ids.map((id: string) => {
    //   return new mongoose.Types.ObjectId(id);
    // });

    // const RecommendedBooks = await BookModel.find({ _id: { $in: idsValid } });

    // return res.status(200).json(RecommendedBooks);
    return res.status(200).json("usuario residido");
  }
}

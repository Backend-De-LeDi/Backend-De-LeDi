import { serviceContainer } from "../../../shared/services/serviceContainer";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { FindProgressMongo } from "../../../userPogressBooks/infrastructure/bookProgressRepoMongo";
import { token } from "../../../shared/types/IToken";

const findProgresMongo = new FindProgressMongo

export class RecommendationControllers {
  async getRecommendations(req: Request, res: Response): Promise<Response> {
    const token: token = req.user;

    const idValid = new mongoose.Types.ObjectId(token.id);

    const progrese = await findProgresMongo.findByUser(idValid)

    if (progrese.length === 0) {
      console.log("recomemdacion por preferencia");
      const recommendations = await serviceContainer.recommendations.getRecommendations.run(idValid);
      return res.status(200).json(recommendations);
    }

    console.log("recomendación semantica");
    const recommendations = await serviceContainer.recommendations.getRecommendatioSemantic.run(idValid)
    return res.status(200).json(recommendations);
  }
}

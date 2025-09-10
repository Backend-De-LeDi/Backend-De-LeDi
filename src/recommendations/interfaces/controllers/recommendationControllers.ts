import { serviceContainer } from "../../../shared/services/serviceContainer";
import { Request, Response } from "express";
import { User } from "../../../userService/domain/entities/UserTypes";
import mongoose from "mongoose";
import { isValid } from "zod";

interface token {
  id: string;
  iat: number;
  exp: number;
}

export class RecommendationControllers {
  async getRecommendations(req: Request, res: Response): Promise<Response> {
    const token: token = req.user;

    const idValid = new mongoose.Types.ObjectId(token.id);

    const recommendations = await serviceContainer.recommendations.getRecommendations.run(idValid);
    return res.status(200).json(recommendations);
  }
}

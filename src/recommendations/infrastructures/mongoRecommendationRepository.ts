import { BookModel } from "../../books/infrastructure/model/books.model";
import { UserModel } from "../../userService/infrastructure/models/userModels";
import { SearchedBook } from "../../shared/types/bookTypes/bookTypes";
import { RecommendationsRepository } from "../domains/recommendationsRepository";
import { Types } from "mongoose";

export class MongoRecommendationRepository implements RecommendationsRepository {
  async getRecommendations(idUser: Types.ObjectId): Promise<SearchedBook[]> {
    const user = await UserModel.findOne({ _id: idUser }).lean();

    if (!user || !user.preference?.category?.length) {
      return [];
    }

    const recommendations = await BookModel.aggregate([
      {
        $match: {
          level: user.nivel
        }
      },
      {
        $addFields: {
          subgenreScore: {
            $size: {
              $setIntersection: ["$subgenre", user.preference.category]
            }
          },
          formatScore: {
            $cond: [
              { $in: ["$format", user.preference.format] },
              1,
              0
            ]
          }
        }
      },
      {
        $addFields: {
          totalScore: {
            $add: ["$subgenreScore", "$formatScore"]
          }
        }
      },
      {
        $lookup: {
          from: "authormodels",
          localField: "author",
          foreignField: "_id",
          as: "authorData"
        }
      },
      {
        $sort: { totalScore: -1, stock: -1 }
      },
      {
        $limit: 10
      },
      {
        $project: {
          _id: 1,
          title: 1,
          summary: 1,
          synopsis: 1,
          subgenre: 1,
          theme: 1,
          genre: 1,
          yearBook: 1,
          language: 1,
          available: 1,
          level: 1,
          format: 1,
          fileExtension: 1,
          totalPages: 1,
          createdAt: 1,
          updatedAt: 1,
          contentBook: 1,
          bookCoverImage: 1,
          totalScore: 1,
          author: {
            $map: {
              input: "$authorData",
              as: "a",
              in: {
                _id: "$$a._id",
                name: "$$a.name"
              }
            }
          }
        }
      }
    ]);
    return recommendations;
  }

  async getRecommendatioSemantic(userId: Types.ObjectId): Promise<SearchedBook[]> {
    console.log(userId)
    return await BookModel.find()
  }
}

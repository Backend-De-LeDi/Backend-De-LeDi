import { Request, Response } from "express";
import { AuthMongoRepostitory, UniqueUsernameRepository, UpdateUSerMongo } from "../../infrastructure/userRespositoryMongo";
import { User } from "../../domain/entities/UserTypes";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { UpdateUSer } from "../../application/service/UpdateUser.Service";
import { UpdateUSerRepository } from "../../domain/ports/UpdateUserRepository";
interface UserRequestParams {
  id: string;
}

// initialize the user service
const userRespositoryMongo: UpdateUSerRepository = new UpdateUSerMongo();
const authRepositoryMongo: AuthUserRepository = new AuthMongoRepostitory();
const uniqueUsername = new UniqueUsernameRepository();

const updateUserService: UpdateUSerRepository = new UpdateUSer(userRespositoryMongo, authRepositoryMongo, uniqueUsername);

export const findAndUpdate = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;
    const id = req.user?.id;
    if (!id) {
      res.status(400).json({ message: "No user ID found" });
    }
    const result = await updateUserService.updateUSer(id, newUser);

    if (!result) {
      res.status(302).json({ msg: "the user not update" });
    }
    res.status(200).json({ msg: "user update successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
};

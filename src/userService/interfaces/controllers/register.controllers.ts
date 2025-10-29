import { Request, Response } from "express";
import { AuthMongoRepostitory, UniqueUsernameRepository, UserMongoRepository } from "../../infrastructure/userRespositoryMongo";
import { User } from "../../domain/entities/UserTypes";
import { IRegisterRepository } from "../../domain/ports/RegisterRepositoryPorts";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { Register } from "../../application/service/Register.Service";
import { ZodError } from "zod";
import { UploadService } from "../../../shared/services/uploadAvatar.service";

// initialize the user service
const userRespositoryMongo: IRegisterRepository = new UserMongoRepository();
const authRepositoryMongo: AuthUserRepository = new AuthMongoRepostitory();
const uniqueUsername = new UniqueUsernameRepository();
const userService: IRegisterRepository = new Register(userRespositoryMongo, authRepositoryMongo, uniqueUsername);
const uploadService = new UploadService();

//register
export const registers = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const newUser = { ...user };

    const result = await userService.createUser(newUser);
    res.status(200).json({ msg: "user creaded  successful", result });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422).json({
        message: "Datos inválidos",
        errors: error.flatten().fieldErrors,
      });
    }
    console.error("internal server error", error);
    res.status(500).json({ message: "internal server error " });
  }
};

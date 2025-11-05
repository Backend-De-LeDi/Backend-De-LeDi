import { Request, Response } from "express";
import { AuthMongoRepostitory, UniqueUsernameRepository, UserMongoRepository } from "../../infrastructure/userRespositoryMongo";
import { validarUsuario } from "../../application/validations/userValidation";
import { User } from "../../domain/entities/UserTypes";
import { IRegisterRepository } from "../../domain/ports/RegisterRepositoryPorts";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { Register } from "../../application/service/Register.Service";
import { ZodError } from "zod";

// initialize the user service
const userRespositoryMongo: IRegisterRepository = new UserMongoRepository();
const authRepositoryMongo: AuthUserRepository = new AuthMongoRepostitory();
const uniqueUsername = new UniqueUsernameRepository();
const userService: IRegisterRepository = new Register(userRespositoryMongo, authRepositoryMongo, uniqueUsername);

//register
export const registers = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const usuarioValido = validarUsuario(user);
    if ('success' in usuarioValido && !usuarioValido.success) {
      res.status(usuarioValido.status).json(usuarioValido);
    }
    const newUser = { ...user };

    const result = await userService.createUser(newUser);
    if ('success' in result && !result.success) {
      res.status(result.status).json(result);
    }
    res.status(200).json({ msg: "user creaded  successful", result });
  } catch (error) {

    console.error("internal server error", error);
    res.status(500).json({ message: "internal server error " });
  }
};

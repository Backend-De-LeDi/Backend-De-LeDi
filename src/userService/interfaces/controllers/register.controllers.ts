import { Request, Response } from "express";
import { AuthMongoRepostitory, UniqueUsernameRepository, UserMongoRepository } from "../../infrastructure/userRespositoryMongo";
import { validarUsuario } from '../../application/validations/userValidation'
import { User } from "../../domain/entities/UserTypes";
import { IRegisterRepository } from "../../domain/ports/RegisterRepositoryPorts";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { Register } from "../../application/service/Register.Service";
import { ZodError } from "zod";


// initialize the user service
const userRespositoryMongo: IRegisterRepository = new UserMongoRepository()
const authRepositoryMongo: AuthUserRepository = new AuthMongoRepostitory()
const uniqueUsername = new UniqueUsernameRepository();
const userService: IRegisterRepository = new Register(userRespositoryMongo, authRepositoryMongo, uniqueUsername)

//register 
export const registers = async (req: Request, res: Response) => {
  try {
    const user: User = req.body
    const usuarioValido = validarUsuario(user);

    const result = await userService.createUser(user)
    res.status(200).json({ msg: 'user creaded  successful', result })



  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      res.status(422).json({
        message: "Datos inválidos",
        errors: error.flatten().fieldErrors,
      });
    }
    console.error("internal server error", error);
    res.status(500).json({ message: "internal server error " });
  }
}


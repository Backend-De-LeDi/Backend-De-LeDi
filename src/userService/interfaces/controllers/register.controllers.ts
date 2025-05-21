import { Request, Response } from "express";
import { AuthMongoRepostitory, UniqueUsernameRepository, UserMongoRepository } from "../../infrastructure/userRespositoryMongo";
import { User } from "../../domain/entities/UserTypes";
import { IRegisterRepository } from "../../domain/ports/RegisterRepositoryPorts";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { Register } from "../../application/service/Register.Service";
interface UserRequestParams {
  id: string;
}

// initialize the user service
const userRespositoryMongo: IRegisterRepository = new UserMongoRepository()
const authRepositoryMongo: AuthUserRepository = new AuthMongoRepostitory()
const uniqueUsername = new UniqueUsernameRepository();
const userService: IRegisterRepository = new Register(userRespositoryMongo, authRepositoryMongo, uniqueUsername)

//register 
export const registers = async (req: Request<UserRequestParams>, res: Response) => {
  try {
    const users: User = req.body;
    const result = await userService.createUser(users)
    res.status(200).json({ msg: 'user creaded  successful', result })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "internal server error", error });
  }
}


import { Request, Response } from "express";
import { UserMongoRepository } from "../../infraestructura/userRespositoryMongo";
import { User } from "../../domain/entities/UserTypes";
import { IUserRepository } from "../../domain/ports/UserRepositoryPorts";
import { Registrar } from "../../aplication/service/User.Service";
interface UserRequestParams {
    id: string;
}

// initialize the user service
const userRespositoryMongo: IUserRepository = new UserMongoRepository()
const userService: IUserRepository = new Registrar(userRespositoryMongo)
export const createUsers = async (req: Request<UserRequestParams>, res: Response) => {
    try {
        const users: User = req.body;
        const result = await userService.createUser(users)

        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occurred", error });
    }
}
// export const getById = async (req: Request, res: Response) => {
//     const userId = req.params.id;
//     if (!userId) {
//         res.status(400).json({ message: "User ID header is missing" });
//         return;
//     }
//     const result = await userService.findByID(userId);
//     if (!result) {
//         res.status(401).json({ msg: 'the user not fund' })
//     } else {
//         console.log(result)
//         res.status(200).json({ msg: 'the user', result })
//     }
// }
// export const getByEmail = async (req: Request, res: Response) => {
//     const email = req.body.email
//     if (!email) {
//         res.status(400).json({ message: "User ID header is missing" });
//         return;
//     }
//     const result = await userService.findByEmail(email);
//     if (!result) {
//         res.status(401).json({ msg: 'the user not fund' })
//     } else {
//         console.log(result)
//         res.status(200).json({ msg: 'the user', result })
//     }

// }

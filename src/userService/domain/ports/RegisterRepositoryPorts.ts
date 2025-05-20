import { User } from "../entities/UserTypes";

// funciones del usuario
export interface IRegisterRepository {
    createUser(user: User): Promise<User>;

}





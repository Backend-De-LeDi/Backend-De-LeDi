import { api_response } from "../../../shared/types/resul.type";
import { User } from "../entities/UserTypes";

// funciones del usuario
export interface IRegisterRepository {
    createUser(user: User): Promise<User | api_response>;

}





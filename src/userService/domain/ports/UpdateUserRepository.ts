import { User } from "../entities/UserTypes";
import { api_response } from "../../../shared/types/resul.type";

export interface UpdateUSerRepository {

    updateUSer(id: any, User: Partial<User>): Promise<User | null | api_response>;

}


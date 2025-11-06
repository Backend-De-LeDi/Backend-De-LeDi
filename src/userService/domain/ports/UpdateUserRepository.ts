import { User } from "../entities/UserTypes";
import { api_response } from "../../../shared/types/reponse.types";

export interface UpdateUSerRepository {

    updateUSer(id: any, User: Partial<User>): Promise<User | null | api_response>;
}


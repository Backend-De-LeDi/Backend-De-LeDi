import { User } from "../entities/UserTypes";

export interface UpdateUSerRepository {

    updateUSer(id: string, User: Partial<User>): Promise<User | null>;
}


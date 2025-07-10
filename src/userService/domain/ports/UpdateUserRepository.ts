import { Types } from "mongoose";
import { User } from "../entities/UserTypes";

export interface UpdateUSerRepository {

    updateUSer(id: any, User: Partial<User>): Promise<User | null>;
}


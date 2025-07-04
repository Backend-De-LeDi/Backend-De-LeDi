import { Types } from "mongoose";
import { User } from "../entities/UserTypes";

export interface UpdateUSerRepository {

    updateUSer(id: Types.ObjectId, User: Partial<User>): Promise<User | null>;
}


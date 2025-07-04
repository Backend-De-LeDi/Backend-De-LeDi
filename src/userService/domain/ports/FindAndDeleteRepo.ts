import { Types } from "mongoose";
import { User } from "../entities/UserTypes";

export interface FindAndDeleteRepo {
    deleteUser(id: Types.ObjectId): Promise<void>
    findUser(): Promise<User[]>
    findByID(id: Types.ObjectId): Promise<User | null>

}
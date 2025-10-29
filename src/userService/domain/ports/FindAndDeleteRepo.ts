import { Types } from "mongoose";
import { User } from "../entities/UserTypes";

export interface FindAndDeleteRepo {
    deleteUser(id: any): Promise<void>
    findUser(): Promise<User[]>
    findByID(id: any): Promise<User | null>
}
import { User } from "../entities/UserTypes";

export interface FindAndDeleteRepo {
    deleteUser(id: string): Promise<void>
    findUser(): Promise<User[]>
    findByID(id: any): Promise<User | null>

}
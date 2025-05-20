import { User } from "../entities/UserTypes";

export interface UniqueUserName {
    findByUserName(userName: string): Promise<User | null>;
}

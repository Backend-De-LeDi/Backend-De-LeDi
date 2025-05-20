import { User } from "../../userService/domain/entities/UserTypes";

export interface AuthUserRepository {
    findByEmail(email: string): Promise<User | null>

}
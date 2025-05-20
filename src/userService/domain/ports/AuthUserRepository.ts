import { User } from "../entities/UserTypes";

export interface AuthUserRepository {
    findByEmail(email: string): Promise<User | null>;
}

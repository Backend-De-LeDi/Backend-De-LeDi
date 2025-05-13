import { User } from "../entities/UserTypes";

// funciones del usuario
export interface IUserRepository {
    createUser(user: User): Promise<User>;
}

// findUser(): Promise<User[]>
// findByID(id: any): Promise<User | null>
// findByEmail(email: string): Promise<User | null>
// findByUserName(user: string): Promise<User | null>
// updateUSer(id: string, User: Partial<User>): Promise<User | null>;
// deleteUser(id: string): Promise<void>
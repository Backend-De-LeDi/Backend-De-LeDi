// application/Auth_users.ts
import bcrypt from 'bcrypt';
import { User } from "../../../userService/domain/entities/UserTypes";
import { AuthUserRepository } from "../../../userService/domain/ports/AuthUserRepository";

export class Auth_users {
    constructor(
        private readonly authRepo: AuthUserRepository
    ) { }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.authRepo.findByEmail(email);
        if (!user) return null;

        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) return null;

        return user;
    }
}

import { UpdateUSerRepository } from "../../domain/ports/UpdateUserRepository";
import { User } from "../../domain/entities/UserTypes";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { UniqueUserName } from "../../domain/ports/UniqueUserName";
import bcrypt from 'bcrypt';


export class UpdateUSer implements UpdateUSerRepository {
    constructor(
        private readonly userRepo: UpdateUSerRepository,
        private readonly authRepo: AuthUserRepository,
        private readonly uniqueRepo: UniqueUserName
    ) { }

    async updateUSer(id: any, user: User): Promise<User | null> {
        const emailExists = await this.authRepo.findByEmail(user.email);
        if (emailExists) {
            throw new Error("Email already in use");
        }

        const usernameExists = await this.uniqueRepo.findByUserName(user.userName);
        if (usernameExists) {
            throw new Error("Username already in use");
        }

        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = { ...user, password: hashedPassword };
            return await this.userRepo.updateUSer(id, newUser);
        }

        return await this.userRepo.updateUSer(id, user);
    }
}

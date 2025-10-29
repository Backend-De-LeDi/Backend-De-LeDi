import { UpdateUSerRepository } from "../../domain/ports/UpdateUserRepository";
import { User } from "../../domain/entities/UserTypes";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { UniqueUserName } from "../../domain/ports/UniqueUserName";
import bcrypt from 'bcrypt';
import { api_response } from "../../../shared/types/reponse.types";
import { FindAndDeleteRepo } from "../../domain/ports/FindAndDeleteRepo";


export class UpdateUSer implements UpdateUSerRepository {
    constructor(
        private readonly userRepo: UpdateUSerRepository,
        private readonly authRepo: AuthUserRepository,
        private readonly uniqueRepo: UniqueUserName,
        private readonly findUser: FindAndDeleteRepo
    ) { }
    async updateUSer(id: any, user: Partial<User>): Promise<User | null | api_response> {
        if (user.email) {
            const emailExists = await this.authRepo.findByEmail(user.email);
            if (emailExists) {
                return {
                    success: false,
                    message: "Email already in use",
                    status: 400
                };
            }
        }
        if (user.userName) {
            const usernameExists = await this.uniqueRepo.findByUserName(user.userName);
            if (usernameExists) {
                return {
                    success: false,
                    message: "UserName already in use",
                    status: 400
                };
            }

        }
        if (user.password) {
            const userOld = await this.findUser.findByID(id);
            if (userOld) {
                const correctPassword = await bcrypt.compare(userOld?.password, user.password);
                if (!correctPassword) return {
                    success: false,
                    message: "The current passwords are not correct",
                    status: 401
                }
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = { ...user, password: hashedPassword };
            return await this.userRepo.updateUSer(id, newUser);
        }
        return await this.userRepo.updateUSer(id, user);
    }
}

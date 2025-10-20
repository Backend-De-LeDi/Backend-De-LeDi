import { User } from "../../domain/entities/UserTypes";
import { IRegisterRepository } from "../../domain/ports/RegisterRepositoryPorts";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { UniqueUserName } from "../../domain/ports/UniqueUserName";
import bcrypt from 'bcrypt-ts';
import { calcularEdad } from "../../../shared/utils/calcularNivel";
import { getAllAvatars } from "../../interfaces/Apis/avatarApi";
import { avatarsAssignment } from "../../domain/utils/avatarAssignment";
import { getLevel } from "../../interfaces/Apis/FetchLevel";

export class Register {
    constructor(
        private readonly userRepo: IRegisterRepository,
        private readonly authRepo: AuthUserRepository,
        private readonly uniqueRepo: UniqueUserName
    ) { }

    async createUser(user: User): Promise<User> {
        const emailExists = await this.authRepo.findByEmail(user.email);
        if (emailExists) {
            throw new Error("Email already in use");
        }

        const usernameExists = await this.uniqueRepo.findByUserName(user.userName);
        if (usernameExists) {
            throw new Error("Username already in use");
        }

        const nivel = calcularEdad(user.birthDate);
        const hashedPassword = await bcrypt.hash(user.password, 10);

        if (!user.avatar) {
            const avatars = await getAllAvatars()
            const level = await getLevel()
            const avatarAssignment = await avatarsAssignment(avatars)
            console.log(avatarAssignment)
            const newUser = { ...user, nivel, avatar: avatarAssignment, level, password: hashedPassword };
            console.log(newUser)
            return await this.userRepo.createUser(newUser);

        }

        const newUser = { ...user, nivel, password: hashedPassword };
        return await this.userRepo.createUser(newUser);
    }
}




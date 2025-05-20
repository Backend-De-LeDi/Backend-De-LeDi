import { calcularEdad } from "../../../shared/utils/calcularNivel";
import { User } from "../../domain/entities/UserTypes";
import { IUserRepository } from "../../domain/ports/UserRepositoryPorts";
import { AuthUserRepository } from "../../domain/ports/AuthUserRepository";
import { UniqueUserName } from "../../domain/ports/UniqueUserNAme";
import bcrypt from 'bcrypt';

export class User_data {
    constructor(
        private readonly userRepo: IUserRepository,
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

        const newUser = { ...user, nivel, password: hashedPassword };
        return await this.userRepo.createUser(newUser);
    }
}





// async findByID(id: string | Types.ObjectId): Promise<User | null> {
//     return await UserModel.findById(id).exec();
// }

// async findByUserName(userName: string): Promise<User | null> {
//     return await UserModel.findOne({ userName });
// }

// async deleteUser(id: string): Promise<void> {
//     await UserModel.findByIdAndDelete(id);
// }
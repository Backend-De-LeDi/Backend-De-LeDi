import { User } from "../../domain/entities/UserTypes";
import { IUserRepository } from "../../domain/ports/UserRepositoryPorts";
import bcrypt from 'bcrypt';


export class Registrar implements IUserRepository {
    constructor(
        private readonly userRepo: IUserRepository,
    ) { }

    // Registrar usuario
    async createUser(user: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const users = { ...user, password: hashedPassword }
        return await this.userRepo.createUser(users)
    }
}


// async findByID(id: string | Types.ObjectId): Promise<User | null> {
//     return await UserModel.findById(id).exec();
// }
// async findByEmail(email: string): Promise<User | null> {
//     return await UserModel.findOne({ email });
// }
// async findByUserName(userName: string): Promise<User | null> {
//     return await UserModel.findOne({ userName });
// }

// async deleteUser(id: string): Promise<void> {
//     await UserModel.findByIdAndDelete(id);
// }
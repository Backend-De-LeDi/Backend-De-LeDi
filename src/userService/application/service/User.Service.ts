import { User } from "../../domain/entities/UserTypes";
import { IUserRepository } from "../../domain/ports/UserRepositoryPorts";
import bcrypt from 'bcrypt';


export class User_data implements IUserRepository {
    constructor(
        private readonly userRepo: IUserRepository,
    ) { }

    // Registrar usuario
    async createUser(user: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const users = { ...user, password: hashedPassword }
        return await this.userRepo.createUser(users)
    }

    // async findByEmail(email: string): Promise<User | null> {
    //     const user_data = await this.userRepo.findByEmail(email)

    //     if (user_data) {
    //         return user_data
    //     }
    //     return null
    // }
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
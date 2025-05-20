import { UserModel } from "./models/userModels";
import { IUserRepository } from "../domain/ports/UserRepositoryPorts";
import { AuthUserRepository } from "../domain/ports/AuthUserRepository";
import { UniqueUserName } from "../domain/ports/UniqueUserNAme";

import { User } from "../domain/entities/UserTypes";


export class UserMongoRepository implements IUserRepository {
    async createUser(user: User): Promise<User> {
        const newUser = new UserModel(user)
        return await newUser.save();
    }
}

export class AuthMongoRepostitory implements AuthUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user_data = UserModel.findOne({ email });

        if (user_data) {
            return user_data
        }
        return null
    }
}

export class UniqueUsernameRepository implements UniqueUserName {
    async findByUserName(userName: string): Promise<User | null> {
        const user = UserModel.findOne({ userName });
        if (user) {
            return user
        }
        return null
    }
}


// async findUser(): Promise<User[]> {
//     return await UserModel.find().exec()
// }


// async findByID(id: any): Promise<User | null> {
//     return await UserModel.findById(id).exec()
// }

// async findByUserName(userName: string): Promise<User | null> {
//     return await UserModel.findOne({ userName: userName }).exec()
// }
// async updateUSer(id: string, User: Partial<User>): Promise<User | null> {
//     return await UserModel.findByIdAndUpdate(id, User, { new: true })
// }
// async deleteUser(id: string): Promise<void> {
//     const deleted = await UserModel.findByIdAndDelete(id)
// }
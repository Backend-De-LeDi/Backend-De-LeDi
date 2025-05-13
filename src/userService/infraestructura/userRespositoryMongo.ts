import { UserModel } from "./DataBase/models/userModels";
import { IUserRepository } from "../domain/ports/UserRepositoryPorts";
import { User } from "../domain/entities/UserTypes";

export class UserMongoRepository implements IUserRepository {
    async createUser(user: User): Promise<User> {
        const newUser = new UserModel(user)
        return await newUser.save();
    }
}
// async findUser(): Promise<User[]> {
//     return await UserModel.find().exec()
// }


// async findByID(id: any): Promise<User | null> {
//     return await UserModel.findById(id).exec()
// }
// async findByEmail(email: string): Promise<User | null> {
//     return await UserModel.findOne({ email: email }).exec()
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
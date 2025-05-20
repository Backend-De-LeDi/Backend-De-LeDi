import { User } from '../../userService/domain/entities/UserTypes';
import { UserModel } from '../../userService/infraestructura/models/userModels';
import { AuthUserRepository } from '../domain/authUserRepository'



export class AuthMongoRepostitory implements AuthUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user_data = UserModel.findOne({ email });

        if (user_data) {
            return user_data
        }
        return null
    }
}
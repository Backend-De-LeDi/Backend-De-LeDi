import { User } from "../../domain/entities/UserTypes";
import { FindAndDeleteRepo } from "../../domain/ports/FindAndDeleteRepo";



export class FindAndDeleteUser implements FindAndDeleteRepo {
    constructor(private readonly userRepo: FindAndDeleteRepo) { }

    async findUser(): Promise<User[]> {
        const users = await this.userRepo.findUser();
        return users
    }
    async findByID(id: any): Promise<User | null> {
        const result = await this.userRepo.findByID(id);
        return result
    }
    async deleteUser(id: string): Promise<void> {
        const result = await this.userRepo.deleteUser(id)
    }
}
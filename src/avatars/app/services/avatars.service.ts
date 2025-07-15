import { Types } from "mongoose";
import { AvatarType } from "../../domain/entities/AvatarsTypes";
import { IAvatar } from "../../domain/ports/AvatarPorts";


export class AvatarsService implements IAvatar {
    constructor(
        private readonly avatarRepo: IAvatar
    ) { }
    async saveAvatar(avatar: AvatarType): Promise<AvatarType> {
        const newAvatar = avatar;
        return await this.avatarRepo.saveAvatar(newAvatar)
    }

    async deleteAvatar(id: Types.ObjectId): Promise<void> {
        await this.avatarRepo.deleteAvatar(id)
    }
    async findAvatars(): Promise<AvatarType[]> {
        return await this.avatarRepo.findAvatars()
    }
}
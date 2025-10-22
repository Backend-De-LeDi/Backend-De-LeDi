import { Types } from "mongoose";
import { AvatarType } from "../../domain/entities/AvatarsTypes";
import { IAvatar } from "../../domain/ports/AvatarPorts";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";


export class AvatarsService implements IAvatar {
    constructor(
        private readonly avatarRepo: IAvatar
    ) { }
    async saveAvatar(avatar: AvatarType): Promise<AvatarType> {
        const newAvatar = avatar;
        return await this.avatarRepo.saveAvatar(newAvatar)
    }

    async deleteAvatar(id: Types.ObjectId): Promise<void> {
        const avatar = await this.avatarRepo.findAvatarById(id);
        if (!avatar) {
            console.warn("level not found")
            throw new Error("level not found");
        }

        if (avatar.avatars.id_image) {
            const deleted = await deleteCoverImage(avatar.avatars.id_image);
            if (!deleted) {
                console.warn(`No se pudo eliminar la imagen de Cloudinary: ${avatar.avatars}`);
            }
        }
        await this.avatarRepo.deleteAvatar(id)
    }
    async findAvatars(): Promise<AvatarType[]> {
        return await this.avatarRepo.findAvatars()
    }
    async findAvatarById(id: any): Promise<AvatarType | null> {
        return await this.avatarRepo.findAvatarById(id)
    }
}
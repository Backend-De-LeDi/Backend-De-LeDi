import { Types } from "mongoose";
import { AvatarType } from "../domain/entities/AvatarsTypes";
import { IAvatar } from "../domain/ports/AvatarPorts";
import { AvatarModel } from "./models/avatarModel";




export class AvatarMongoRepository implements IAvatar {
    async saveAvatar(avatar: AvatarType): Promise<AvatarType> {
        const newAvatar = new AvatarModel(avatar);
        return await newAvatar.save()
    }
    async findAvatars(): Promise<AvatarType[]> {
        const result = await AvatarModel.find()
        return result
    }

    async deleteAvatar(id: Types.ObjectId): Promise<void> {
        const result = await AvatarModel.findByIdAndDelete(id)

    }
}
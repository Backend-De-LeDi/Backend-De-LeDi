import { Types } from "mongoose";
import { AvatarType } from "../entities/AvatarsTypes";

export interface IAvatar {
    saveAvatar(avatar: AvatarType): Promise<AvatarType>
    findAvatars(): Promise<AvatarType[]>
    deleteAvatar(id: any): Promise<void>
}
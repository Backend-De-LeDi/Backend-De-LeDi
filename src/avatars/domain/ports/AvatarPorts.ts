import { Types } from "mongoose";
import { AvatarType } from "../entities/AvatarsTypes";

export interface IAvatar {
	saveAvatar(avatar: AvatarType): Promise<AvatarType>
	findAvatars(): Promise<AvatarType[]>
	findAvatarById(id: any): Promise<AvatarType | null>
	deleteAvatar(id: any): Promise<void | null>
	updateAvatar(id: Types.ObjectId, avatar: AvatarType): Promise<AvatarType | null>
}
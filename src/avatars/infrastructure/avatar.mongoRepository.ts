import { Types } from "mongoose";
import { AvatarType } from "../domain/entities/AvatarsTypes";
import { IAvatar } from "../domain/ports/AvatarPorts";
import { AvatarModel } from "./models/avatarModel";
import { deleteCoverImage } from "../../shared/utils/deleteCoverImage";




export class AvatarMongoRepository implements IAvatar {
	async saveAvatar(avatar: AvatarType): Promise<AvatarType> {
		const newAvatar = new AvatarModel(avatar);
		return await newAvatar.save()
	}
	async findAvatars(): Promise<AvatarType[]> {
		const result = await AvatarModel.find()
		return result
	}

	async deleteAvatar(id: Types.ObjectId): Promise<void | null> {
		const result = await AvatarModel.findById(id);
		if (!result) {
			return null
		}
		await deleteCoverImage(result.avatars.id_image);

		await AvatarModel.findByIdAndDelete(result._id);

	}
	async findAvatarById(id: any): Promise<AvatarType | null> {
		return await AvatarModel.findById(id)
	}

	async updateAvatar(id: Types.ObjectId, avatar: AvatarType): Promise<AvatarType | null> {
		return await AvatarModel.findByIdAndUpdate(id, avatar, { new: true });
	}
}
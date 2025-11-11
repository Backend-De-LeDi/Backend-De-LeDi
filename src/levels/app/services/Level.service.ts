import { Types } from "mongoose";
import { ILevelsRepo } from "../../domain/ports/levelPorts";
import { LevelsTypes } from "../../domain/entities/LevesTypes";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";



export class LevelService implements ILevelsRepo {
    constructor(
        private readonly levelRepo: ILevelsRepo
    ) { }
    async saveLevel(avatar: LevelsTypes): Promise<LevelsTypes> {
        const newAvatar = avatar;
        return await this.levelRepo.saveLevel(newAvatar)
    }

    async deleteLevel(id: Types.ObjectId): Promise<void> {
        const level = await this.levelRepo.findLevelByID(id);
        if (!level) {
            console.warn("level not found")
            throw new Error("level not found");
        }

        if (level.img.id_image) {
            const deleted = await deleteCoverImage(level.img.id_image);
            if (!deleted) {
                console.warn(`No se pudo eliminar la imagen de Cloudinary: ${level.img}`);
            }
        }
        await this.levelRepo.deleteLevel(id)
    }
    async findLevel(level: number): Promise<LevelsTypes> {
        return await this.levelRepo.findLevel(level)
    }
    async findLevelByID(id: any): Promise<LevelsTypes | null> {
        return this.levelRepo.findLevelByID(id)
    }
    async findFirtsLevel(uno: number): Promise<LevelsTypes | null> {
        return this.levelRepo.findFirtsLevel(uno)
    }
}
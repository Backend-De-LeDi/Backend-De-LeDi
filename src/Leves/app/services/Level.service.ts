import { Types } from "mongoose";
import { ILevesRepo } from "../../domain/ports/levelPorts";
import { LevesTypes } from "../../domain/entities/LevesTypes";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";



export class LevelService implements ILevesRepo {
    constructor(
        private readonly levelRepo: ILevesRepo
    ) { }
    async saveLevel(avatar: LevesTypes): Promise<LevesTypes> {
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
    async findLevel(level: number): Promise<LevesTypes> {
        return await this.levelRepo.findLevel(level)
    }
    async findLevelByID(id: any): Promise<LevesTypes | null> {
        return this.levelRepo.findLevelByID(id)
    }
    async findFirtsLevel(uno: number): Promise<LevesTypes | null> {
        return this.levelRepo.findFirtsLevel(uno)
    }
}
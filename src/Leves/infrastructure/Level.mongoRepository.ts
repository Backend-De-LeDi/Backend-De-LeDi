import { Types } from "mongoose";
import { LevesTypes } from "../domain/entities/LevesTypes";
import { LevelModel } from "./models/LevelModel";
import { ILevesRepo } from "../domain/ports/levelPorts";




export class LevelMongoRepository implements ILevesRepo {
    async saveLevel(level: LevesTypes): Promise<LevesTypes> {
        const newLevel = new LevelModel(level);
        return await newLevel.save()
    }
    async findLevel(level: number): Promise<LevesTypes> {
        const result = await LevelModel.findOne({ level: level })
        if (!result) throw new Error('Level not found')
        return result
    }

    async deleteLevel(id: Types.ObjectId): Promise<void> {
        const result = await LevelModel.findByIdAndDelete(id)

    }
    async findLevelByID(id: any): Promise<LevesTypes | null> {
        return await LevelModel.findById(id)
    }
    async findFirtsLevel(uno: number): Promise<LevesTypes | null> {
        return await LevelModel.findOne({ level: uno })
    }
}
import { Types } from "mongoose";
import { LevelsTypes } from "../domain/entities/LevesTypes";
import { LevelModel } from "./models/LevelModel";
import { ILevelsRepo } from "../domain/ports/levelPorts";




export class LevelMongoRepository implements ILevelsRepo {
    async saveLevel(level: LevelsTypes): Promise<LevelsTypes> {
        const newLevel = new LevelModel(level);
        return await newLevel.save()
    }
    async findLevel(level: number): Promise<LevelsTypes> {
        const result = await LevelModel.findOne({ level: level })
        if (!result) throw new Error('Level not found')
        return result
    }

    async deleteLevel(id: Types.ObjectId): Promise<void> {
        const result = await LevelModel.findByIdAndDelete(id)

    }
    async findLevelByID(id: any): Promise<LevelsTypes | null> {
        return await LevelModel.findById(id)
    }
    async findFirtsLevel(uno: number): Promise<LevelsTypes | null> {
        return await LevelModel.findOne({ level: uno })
    }
}
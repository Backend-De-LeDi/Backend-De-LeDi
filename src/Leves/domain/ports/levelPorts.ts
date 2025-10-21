import { Types } from "mongoose";
import { LevesTypes } from "../entities/LevesTypes";

export interface ILevesRepo {
    saveLevel(level: LevesTypes): Promise<LevesTypes>
    findLevel(level: number): Promise<LevesTypes>
    deleteLevel(id: any): Promise<void>
    findLevelByID(id: any): Promise<LevesTypes | null>
    findFirtsLevel(uno: number): Promise<LevesTypes | null>
}
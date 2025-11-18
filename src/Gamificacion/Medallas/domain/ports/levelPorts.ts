import { LevelsTypes } from "../entities/LevesTypes"

export interface ILevelsRepo {
    saveLevel(level: LevelsTypes): Promise<LevelsTypes>
    findLevel(level: number): Promise<LevelsTypes>
    deleteLevel(id: any): Promise<void>
    findLevelByID(id: any): Promise<LevelsTypes | null>
    findFirtsLevel(uno: number): Promise<LevelsTypes | null>
}
import { MedalsTypes } from "../entities/MedalsTypes"

export interface IMedalsRepo {
    saveMedals(medals: MedalsTypes): Promise<MedalsTypes>
    deleteMedals(id: any): Promise<void>
    findMedalsByID(id: any): Promise<MedalsTypes | null>
}
import { Types } from "mongoose";
import { IMedalsRepo } from "../domain/ports/medalsPorts";
import { MedalsModel } from "./models/MedalslModel";
import { MedalsTypes } from "../domain/entities/MedalsTypes";





export class MedalsMongoRepository implements IMedalsRepo {
    async saveMedals(medals: MedalsTypes): Promise<MedalsTypes> {
        const newMedal = new MedalsModel(medals);
        return await newMedal.save()
    }
    async findMedalsByID(id: any): Promise<MedalsTypes | null> {
        return await MedalsModel.findById(id)
    }
    async deleteMedals(id: any): Promise<void> {
        await MedalsModel.findByIdAndDelete(id)
    }
}
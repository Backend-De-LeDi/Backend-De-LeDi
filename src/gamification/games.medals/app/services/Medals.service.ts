import { deleteCoverImage } from "../../../../shared/utils/deleteCoverImage";
import { MedalsTypes } from "../../domain/entities/MedalsTypes";
import { IMedalsRepo } from "../../domain/ports/medalsPorts";



export class MedalService implements IMedalsRepo {
    constructor(
        private readonly medalsRepo: IMedalsRepo
    ) { }
    async saveMedals(medals: MedalsTypes): Promise<MedalsTypes> {
        const newMedals = medals;
        return await this.medalsRepo.saveMedals(newMedals)
    }
    async deleteMedals(id: any): Promise<void> {
        const medal = await this.medalsRepo.findMedalsByID(id)
        if (!medal) {
            console.warn("medal not found")
            throw new Error("medal not found")
        }
        if (medal.img.id_image) {
            const deleted = await deleteCoverImage(medal.img.id_image);
            if (!deleted) {
                console.warn(`No se pudo eliminar la imagen de Cloudinary: ${medal.img}`);
            }
        }
        await this.medalsRepo.deleteMedals(id)

    }
    async findMedalsByID(id: any): Promise<MedalsTypes | null> {
        return await this.medalsRepo.findMedalsByID(id)
    }
}
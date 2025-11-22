import { FindAndDeleteRepo } from "../../../userService/domain/ports/FindAndDeleteRepo";
import { UpdateUSerRepository } from "../../../userService/domain/ports/UpdateUserRepository";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { FindProgressPort } from "../../domain/ports/findProgres";
import { UpdateProgresPort } from "../../domain/ports/updateProgressPort";
import { selecLevel } from "../../domain/utils/selec_nivel";

export class UpdateProgressService implements UpdateProgresPort {
    constructor(
        private readonly progresRepo: UpdateProgresPort,
        private readonly findProgreso: FindProgressPort,
        private readonly getUser: FindAndDeleteRepo,
        private readonly updateUser: UpdateUSerRepository
    ) { }

    async updateProgres(
        id: string,
        data: Partial<BookUserProgresRepo>
    ): Promise<BookUserProgresRepo | null> {

        const progreso = await this.findProgreso.findById(id);
        if (!progreso) return null;


        if (data.percent === 100 && progreso.status !== "finished") {
            console.log("status finalizado")
            data.status = "finished";
        }


        if (data.status === "finished") {
            data.finishDate = new Date();

            const user = await this.getUser.findByID(progreso.idUser);
            if (user) {
                const newPoints = user.point + 100;
                await this.updateUser.updateUSer(user._id, { point: newPoints });

                const levelData = await selecLevel(user._id);

                if (levelData && levelData.id.toString() !== user.level.toString()) {
                    console.log(levelData.id, levelData.img)
                    await this.updateUser.updateUSer(user._id, {
                        level: levelData.id,
                        imgLevel: levelData.img
                    });
                }
            }
        }

        return await this.progresRepo.updateProgres(id, data);
    }
}

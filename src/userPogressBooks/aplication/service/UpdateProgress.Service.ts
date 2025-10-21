import { Types } from "mongoose";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { UpdateProgresPort } from "../../domain/ports/updateProgressPort";
import { selecLevel } from "../../domain/utils/selec_nivel";
import { UpdateUSerRepository } from "../../../userService/domain/ports/UpdateUserRepository";
import { FindAndDeleteRepo } from "../../../userService/domain/ports/FindAndDeleteRepo";
import { FindProgressPort } from "../../domain/ports/findProgres";

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

        const progreso = await this.findProgreso.findById(id)

        if (data.status === "finished") {
            data.finishDate = new Date();

            const userData = await this.getUser.findByID(progreso?.idUser);
            console.log(userData?.point)
            if (userData) {
                const newPoints = userData.point + 100;

                await this.updateUser.updateUSer(userData._id, { point: newPoints });

                const newLevelId = await selecLevel(userData._id);

                if (newLevelId && newLevelId !== userData.level) {
                    await this.updateUser.updateUSer(userData._id, { level: newLevelId });
                }
            }
        }


        // if (book.format === "ebook" || book.format === "pdf" || book.format === "epub") {
        //     data.unit = "page";
        //     data.total = book.totalPages || 0;
        // } else if (book.format === "audiobook" || book.format === "video") {
        //     data.unit = "second";
        //     data.total = book.duration || 0;
        // }
        // data.position = data.position ?? 0;


        // if (data.total && data.position !== undefined) {
        //     data.percent = Math.min(100, (data.position / data.total) * 100);
        // }

        return await this.progresRepo.updateProgres(id, data);
    }
}

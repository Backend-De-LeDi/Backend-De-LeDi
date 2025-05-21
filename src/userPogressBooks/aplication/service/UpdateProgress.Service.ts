import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { deleteProgress } from "../../domain/ports/deleteProgress.Ports";
import { UpdateProgresPort } from '../../domain/ports/updateProgressPort';

export class UpdateProgressService implements UpdateProgresPort {
    constructor(
        private readonly progresRepo: UpdateProgresPort,
        private readonly deleteProgres: deleteProgress
    ) { }

    async updateProgres(id: string, date: Partial<BookUserProgresRepo>): Promise<BookUserProgresRepo | null> {
        if (date.status === "unmarked") {
            await this.deleteProgres.deleteProgres(id);
            return null;
        }

        return await this.progresRepo.updateProgres(id, date);
    }
}

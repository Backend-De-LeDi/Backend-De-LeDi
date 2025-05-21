import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { BookProgresPort } from '../../domain/ports/saveProgres.Ports'

export class BookSaveProgres {
    constructor(
        private readonly progresRepo: BookProgresPort
    ) { }

    async saveBookProgres(date: BookUserProgresRepo): Promise<BookUserProgresRepo> {
        const saveProgres = await this.progresRepo.saveProgress(date)
        return saveProgres
    }
}
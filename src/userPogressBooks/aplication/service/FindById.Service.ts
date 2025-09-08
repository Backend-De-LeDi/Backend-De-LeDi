import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { FindProgressPort } from "../../domain/ports/findProgres";



export class FindProgresByID implements FindProgressPort {
    constructor(
        private readonly findProgress: FindProgressPort
    ) { }
    async findByUser(id: any): Promise<BookUserProgresRepo[] | null> {
        const progreso = await this.findProgress.findByUser(id)
        console.log(progreso?.length)
        return progreso
    }
    async findByBook(id: any): Promise<BookUserProgresRepo[] | null> {
        const progreso = await this.findProgress.findByBook(id)
        return progreso
    }
}

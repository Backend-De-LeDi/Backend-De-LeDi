import { BookUserProgresRepo } from "../entities/BookPogress.types"

export interface BookProgresPort {
    saveProgress(datos: BookUserProgresRepo): Promise<BookUserProgresRepo>
}
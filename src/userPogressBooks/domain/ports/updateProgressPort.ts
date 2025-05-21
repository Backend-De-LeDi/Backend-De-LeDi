import { BookUserProgresRepo } from "../entities/BookPogress.types";

export interface UpdateProgresPort {
    updateProgres(id: string, date: Partial<BookUserProgresRepo>): Promise<BookUserProgresRepo | null>
}

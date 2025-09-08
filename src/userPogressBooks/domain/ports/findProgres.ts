import { BookUserProgresRepo } from "../entities/BookPogress.types";


export interface FindProgressPort {
    findByUser(id: any): Promise<BookUserProgresRepo[] | null>
    findByBook(id: any): Promise<BookUserProgresRepo[] | null>
}

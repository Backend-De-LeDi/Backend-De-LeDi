import { Author } from "../entidades/author.Types";


export interface FindAuthor {
    findById(id: any): Promise<Author | null>
    findByName(date: string): Promise<Author | null>
    findAuthor(): Promise<Author[]>
}
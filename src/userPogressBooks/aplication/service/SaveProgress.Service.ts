import { Types } from "mongoose";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { BookProgresPort } from "../../domain/ports/saveProgres.Ports";
import { GetBooksByIds } from "../../../books/application";

export class BookSaveProgres {
    constructor(
        private readonly progresRepo: BookProgresPort,
        private readonly getBooksByIds: GetBooksByIds
    ) { }
    //Funcion de logica de negocio para Guardar libros 
    async saveBookProgres(data: BookUserProgresRepo): Promise<BookUserProgresRepo> {
        
        const books = await this.getBooksByIds.run([new Types.ObjectId(data.idBook)]);
        const book = books[0];

        if (!book) {
            throw new Error("Libro no encontrado");
        }

        //Ajuste por el formato
        if (book.format === "ebook" || book.format === "pdf" || book.format === "epub") {
            data.unit = "page";
            data.total = book.totalPages || 0;
        } else if (book.format === "audiobook" || book.format === "video") {
            data.unit = "second";
            data.total = book.duration || 0;
        }
        data.position = data.position ?? 0;
        if (data.total > 0) {
            data.percent = Math.min(100, (data.position / data.total) * 100);
        } else {
            data.percent = 0;
        }

        const saveProgres = await this.progresRepo.saveProgress(data);
        return saveProgres;
    }
}

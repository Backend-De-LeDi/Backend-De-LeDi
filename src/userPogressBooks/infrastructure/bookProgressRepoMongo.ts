import { BookProgressModel } from "./models/BookProgressModel";
import { BookProgresPort } from '../domain/ports/saveProgres.Ports'
import { BookUserProgresRepo } from "../domain/entities/BookPogress.types";
import { UpdateProgresPort } from "../domain/ports/updateProgressPort";
import { deleteProgress } from "../domain/ports/deleteProgress.Ports";
import { FindProgressPort } from "../domain/ports/findProgres";


export class BookProgresMongo implements BookProgresPort {
    async saveProgress(datos: BookUserProgresRepo): Promise<BookUserProgresRepo> {
        const newProgres = new BookProgressModel(datos)
        return await newProgres.save()
    }
}

export class UpdateProgressMongo implements UpdateProgresPort {
    async updateProgres(id: string, date: Partial<BookUserProgresRepo>): Promise<BookUserProgresRepo | null> {
        const updateProgres = await BookProgressModel.findByIdAndUpdate(id, date, { new: true })
        if (!updateProgres) {
            return null
        }
        return updateProgres
    }
}

export class DeleteRepo implements deleteProgress {
    async deleteProgres(id: string): Promise<void> {
        await BookProgressModel.findByIdAndDelete(id)
    }
}

export class FindProgressMongo implements FindProgressPort {
    async findByUser(id: any): Promise<BookUserProgresRepo[]> {
        const result = await BookProgressModel.find({ idUser: id });
        return result;
    }
    async findByBook(id: any, idUser: any): Promise<BookUserProgresRepo[] | null> {
        const result = await BookProgressModel.find({ idBook: id, idUser: idUser });
        return result;
    }
}
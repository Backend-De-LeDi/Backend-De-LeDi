
import { Request, Response } from "express";
import { BookSaveProgres } from "../../aplication/service/SaveProgress.Service";
import { BookProgresPort } from "../../domain/ports/saveProgres.Ports";
import { BookProgresMongo } from "../../infrastructure/bookProgressRepoMongo";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";

const saveRepoMongo: BookProgresPort = new BookProgresMongo()
const bookService = new BookSaveProgres(saveRepoMongo)

export const saveBookProgress = async (req: Request, res: Response) => {
    const bookDate: BookUserProgresRepo = req.body;

    try {
        const result = await bookService.saveBookProgres(bookDate)

        if (!result) {
            res.status(304).json({ msg: 'the book-progress not save' })
        }
        res.status(201).json({ msg: 'the book-progres save successfull' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'internal server error', error })
    }

}

import { Request, Response } from "express";
import { BookSaveProgres } from "../../aplication/service/SaveProgress.Service";
import { BookProgresPort } from "../../domain/ports/saveProgres.Ports";
import { BookProgresMongo } from "../../infrastructure/bookProgressRepoMongo";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";

const saveRepoMongo: BookProgresPort = new BookProgresMongo()
const bookService = new BookSaveProgres(saveRepoMongo)


export const saveBookProgress = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ msg: "Unauthorized" });
        }

        const bookData: BookUserProgresRepo = {
            ...req.body,
            userId,
        };

        const result = await bookService.saveBookProgres(bookData);

        if (!result) {
            res
                .status(304)
                .json({ msg: "the book-progress was not saved" });
        }

        res.status(201).json({ msg: "the book-progress saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "internal server error", error });
    }
};

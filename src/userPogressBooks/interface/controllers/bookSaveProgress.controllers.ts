import { Request, Response } from "express";
import { BookSaveProgres } from "../../aplication/service/SaveProgress.Service";
import { BookProgresPort } from "../../domain/ports/saveProgres.Ports";
import { BookProgresMongo } from "../../infrastructure/bookProgressRepoMongo";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { GetBooksByIds } from "../../../books/application";
import { MongoQueryRepository } from "../../../books/infrastructure/mongo";


// Repositorios
const saveRepoMongo: BookProgresPort = new BookProgresMongo();
const booksRepo = new MongoQueryRepository();
const getBooksByIds = new GetBooksByIds(booksRepo);

// Servicio
const bookService = new BookSaveProgres(saveRepoMongo, getBooksByIds);

export const saveBookProgress = async (req: Request, res: Response) => {
    try {
        const idUser = req.user?.id;
        if (!idUser) {
            res.status(401).json({ msg: "Unauthorized" });
        }

        // Crear el DTO (BookUserProgresRepo) con los datos del request
        const bookData: BookUserProgresRepo = {
            ...req.body,
            idUser,
        };

        const result = await bookService.saveBookProgres(bookData);

        if (!result) {
            res
                .status(304)
                .json({ msg: "The book-progress was not saved" });
        }

        res.status(201).json({
            msg: "The book-progress was saved successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", error });
    }
};
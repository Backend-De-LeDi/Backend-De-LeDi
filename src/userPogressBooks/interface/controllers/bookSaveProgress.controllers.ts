import { Request, Response } from "express";
import { BookSaveProgres } from "../../aplication/service/SaveProgress.Service";
import { BookProgresPort } from "../../domain/ports/saveProgres.Ports";
import { BookProgresMongo } from "../../infrastructure/bookProgressRepoMongo";
import { BookUserProgresRepo } from "../../domain/entities/BookPogress.types";
import { GetBooksByIds } from "../../../books/application/getBooksByIds";
import { MongoBookRepository } from "../../../books/infrastructure/mongoBookRepository";
import { Types, isValidObjectId } from "mongoose";

// Repositorios
const saveRepoMongo: BookProgresPort = new BookProgresMongo();
const booksRepo = new MongoBookRepository();
const getBooksByIds = new GetBooksByIds(booksRepo);

// Servicio
const bookService = new BookSaveProgres(saveRepoMongo, getBooksByIds);

export const saveBookProgress = async (req: Request, res: Response) => {
    try {
        const { idUser, idBook, status, position } = req.body;

        // ✅ Validar idUser
        if (!idUser || typeof idUser !== "string" || !isValidObjectId(idUser)) {
            res.status(400).json({ msg: "Invalid or missing idUser" });
        }

        // ✅ Si también esperas idBook, puedes validar
        if (idBook && !isValidObjectId(idBook)) {
            res.status(400).json({ msg: "Invalid idBook" });
        }

        // ✅ Se arma el objeto con ObjectId real
        const bookData: BookUserProgresRepo = {
            ...req.body,
            idUser: new Types.ObjectId(idUser),
            idBook: idBook ? new Types.ObjectId(idBook) : undefined,
        };

        const result = await bookService.saveBookProgres(bookData);

        if (!result) {
            res.status(304).json({ msg: "The book-progress was not saved" });
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

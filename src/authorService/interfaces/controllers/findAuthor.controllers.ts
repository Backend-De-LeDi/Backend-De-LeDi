import { Request, Response } from "express";
import { FindAuthors } from "../../app/service/FindAuthor.service";
import { FindAuthor as findAuthorRepo } from "../../domain/ports/findAuthorRepository";
import { findAuthorMongoRepo } from "../../infrastructure/authores.MongoRepo";



const findAuthorRepo = new findAuthorMongoRepo();
const findAuthorService = new FindAuthors(findAuthorRepo);


export const getAuthorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const author = await findAuthorService.findAuthor(id);

        if (!author) {
            res.status(404).json({ message: "Autor no encontrado" });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error("Error al buscar autor:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
export const getAuthorByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const author = await findAuthorService.findAuthorbyName(name);

        if (!author) {
            res.status(404).json({ message: "Autor no encontrado" });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error("Error al buscar autor:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

import { Request, Response } from "express";
import { UpdateProgressService } from "../../aplication/service/UpdateProgress.Service";
import { UpdateProgressMongo, DeleteRepo } from "../../infrastructure/bookProgressRepoMongo";
import { GetBooksByIds } from "../../../books/application";
import { MongoQueryRepository } from "../../../books/infrastructure/mongo";

//intancias 
const updateRepo = new UpdateProgressMongo();
const booksRepo = new MongoQueryRepository();
const getBooksByIds = new GetBooksByIds(booksRepo);
const bookService = new UpdateProgressService(updateRepo, getBooksByIds);

//controllador para actualizar progreso
export const updateProgresBook = async (req: Request, res: Response) => {
    try {
        const { id, ...date } = req.body;

        const result = await bookService.updateProgres(id, date);

        if (!result) {
            res.status(200).json({ msg: 'Progress was unmarked and deleted successfully.' });
        } else {
            res.status(200).json({ msg: 'Progress updated successfully.', result });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

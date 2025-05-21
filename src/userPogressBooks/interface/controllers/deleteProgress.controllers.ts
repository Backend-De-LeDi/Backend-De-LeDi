import { DeleteRepo } from "../../infrastructure/bookProgressRepoMongo";
import { deleteProgress } from '../../domain/ports/deleteProgress.Ports'
import { DeleteProgresService } from "../../aplication/service/DeleteProgress.Service";
import { Request, Response } from "express";

const repo: deleteProgress = new DeleteRepo();
const deleteService: deleteProgress = new DeleteProgresService(repo);


export const deleteProgresBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const result = await deleteService.deleteProgres(id);

        res.status(200).json({ msg: 'progress delete succesfull' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error });
    }
}
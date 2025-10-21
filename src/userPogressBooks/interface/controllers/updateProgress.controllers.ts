import { Request, Response } from "express";
import { UpdateProgressService } from "../../aplication/service/UpdateProgress.Service";
import { FindProgressMongo, UpdateProgressMongo } from "../../infrastructure/bookProgressRepoMongo";
import { findAndDeleteMongo, UpdateUSerMongo } from "../../../userService/infrastructure/userRespositoryMongo";

// Instancias
const updateRepo = new UpdateProgressMongo();
const getUser = new findAndDeleteMongo();
const updateUser = new UpdateUSerMongo();
const getProgress = new FindProgressMongo()
const bookService = new UpdateProgressService(updateRepo, getProgress, getUser, updateUser);

// Controlador para actualizar progreso
export const updateProgresBook = async (req: Request, res: Response) => {
    try {
        const { id, ...progressData } = req.body; // Tomamos id y el resto como datos del progreso

        // Llamamos al servicio con los datos planos
        const result = await bookService.updateProgres(id, progressData);

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

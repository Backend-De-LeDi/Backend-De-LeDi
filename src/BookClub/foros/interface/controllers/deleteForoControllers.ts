import { Request, Response } from "express";
import { DeleteForo } from "../../app/service/deleteForos.service";
import { DeleteForoMongo } from "../../infraestructure/foros.repo.mongo";



//new intances
const deleteForoMongo = new DeleteForoMongo();
const deleteforoService = new DeleteForo(deleteForoMongo)


export const deleteForo = async (req: Request, res: Response) => {
    const id = req.params
    const result = await deleteforoService.deleteForo(id);
    res.json({ msg: 'foro deleted succesfull' })
}


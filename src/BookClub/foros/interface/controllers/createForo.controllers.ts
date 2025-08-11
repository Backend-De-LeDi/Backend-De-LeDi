import { CreateForoService } from "../../app/service/createForos.service";
import { Foro } from "../../domain/entities/foros.types";
import { CreateForoMongo } from "../../infraestructure/foros.repo.mongo";
import { Request, Response } from "express";

//new intance of Mongo repository
const createForoMongo = new CreateForoMongo();
//new intance of Foro service
const foroService = new CreateForoService(createForoMongo);

//create foro
export const createForoController = async (req: Request, res: Response) => {
    try {
        const foro: Foro = req.body as Foro;

        const result = await foroService.createForo(foro);

        res.status(201).json({
            msg: 'foro creaded successful', result
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'the internal server error', error })
    }
};

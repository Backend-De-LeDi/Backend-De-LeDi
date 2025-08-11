import { Request, Response } from "express";
import { CreateComentService } from "../../app/service/createComents.Service";
import { CreateComentMongo } from "../../infraestructure/comentsMongoRepo";
import { ComentTypes } from "../../domain/entities/coments.types";

const createComentMongo = new CreateComentMongo();
const createComent = new CreateComentService(createComentMongo);


export const createComentControllet = async (req: Request, res: Response) => {
    try {
        const coment: ComentTypes = req.body;

        const result = await createComent.createComent(coment)

        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ msg: "the internal server error" })
    }
}
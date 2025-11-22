import { Request, Response } from "express";
import { AdminCreateComentService, CreateComentService } from "../../app/service/createComents.Service";
import { CreateComentMongo } from "../../infraestructure/comentsMongoRepo";
import { ComentTypes } from "../../domain/entities/coments.types";
import { resourceUsage } from "process";

const createComentMongo = new CreateComentMongo();
const createComent = new CreateComentService(createComentMongo);
const createComents = new AdminCreateComentService(createComentMongo)


export const createComentLogic = async (coment: ComentTypes) => {
    return await createComent.createComent(coment);
};

export const createComentHttp = async (req: Request, res: Response) => {
    try {
        const idUser = req.user?.id;
        if (!idUser) {
            res.status(401).json({ msg: "Unauthorized" });
        }
        const coment: ComentTypes = {
            idUser,
            ...req.body
        }
        const result = await createComents.createComent(coment)

        if (!result) {
            res.status(304).json({ msg: 'the coment not created' })
            return
        }
        res.status(201).json({
            msg: "the coment created successfull",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", error });
    }
};
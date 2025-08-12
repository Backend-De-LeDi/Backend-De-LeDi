import { Request, Response } from "express";
import { CreateComentService } from "../../app/service/createComents.Service";
import { CreateComentMongo } from "../../infraestructure/comentsMongoRepo";
import { ComentTypes } from "../../domain/entities/coments.types";

const createComentMongo = new CreateComentMongo();
const createComent = new CreateComentService(createComentMongo);


export const createComentLogic = async (coment: ComentTypes) => {
    return await createComent.createComent(coment);
};
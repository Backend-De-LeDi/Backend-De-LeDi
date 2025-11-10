import { Request, Response } from "express";
import { DeleteComentService } from "../../app/service/deleteComent.Service";
import { DeleteComentsMongo } from "../../infraestructure/comentsMongoRepo";



const deletComentmongo = new DeleteComentsMongo();
const deletComentService = new DeleteComentService(deletComentmongo)



export const DeleteComent = async (id: any, userId: any) => {
    const result = await deletComentService.deleteComent(id, userId)
}
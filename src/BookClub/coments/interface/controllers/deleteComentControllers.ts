import { Request, Response } from "express";
import { DeleteComentService } from "../../app/service/deleteComent.Service";
import { DeleteComentsMongo } from "../../infraestructure/comentsMongoRepo";



const deletComentmongo = new DeleteComentsMongo();
const deletComentService = new DeleteComentService(deletComentmongo)



export const DeleteComent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await deletComentService.deleteComent(id)

        res.status(200).json({
            msg: 'the coment deleted succesful'
        })
    } catch (error) {
        res.status(500).json({ msg: 'the internal server error' })
    }
}
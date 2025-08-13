import { Request, Response } from "express";
import { FindComentService } from "../../app/service/findComent.Service";
import { FindComentsMongo } from "../../infraestructure/comentsMongoRepo";



const findComentsMongo = new FindComentsMongo();
const findComent = new FindComentService(findComentsMongo)


export const getAllComents = async () => {
    try {
        const result = await findComent.findComents()
        return result
    } catch (error) {

    }
}
export const getComentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await findComent.findComentById(id)

        if (!result) {
            res.status(404).json({ msg: 'coment not found' })
        }
        res.status(200).json({ msg: 'the coment', result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'the internal server error', error })
    }
}
import e, { Request, Response } from "express";
import { FindComentService } from "../../app/service/findComent.Service";
import { FindComentsMongo } from "../../infraestructure/comentsMongoRepo";
import { Result } from "express-validator";



const findComentsMongo = new FindComentsMongo();
const findComent = new FindComentService(findComentsMongo)


export const getAllComents = async () => {
    try {
        const result = await findComent.findComents()
        return result
    } catch (error) {
        return error
    }
}
export const getComentById = async (id: any) => {
    try {
        const result = await findComent.findComentById(id)

        if (!result) {
            return "The coment not found"
        }
        return result

    } catch (error) {
        return error
    }
}
export const getComentsByForo = async (foroId: string) => {
    try {
        return await findComent.findComentByForo(foroId);
    } catch (error) {
        console.log(error)
        return error
    }
};
export const getComentByUserID = async (userid: string) => {
    try {
        const comentarios = await findComent.findComentByUserID(userid);
        return comentarios;
    } catch (error) {
        console.error("Error en getComentByUserID:", error);
        return error
    }
}
export const getAdmindComent = async (req: Request, res: Response) => {
    try {
        const result = await findComent.findAdminComent()
        console.log(result)

        if (!result === null) {
            res.status(200).json({ msg: 'the admin not post the coments' })
        }

        res.status(200).json(result)

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", error });
    }
}
import { Request, Response } from "express";
import { FindForoService } from "../../app/service/findForos.Service";
import { FindForoMongo } from "../../infraestructure/foros.repo.mongo";



//new intances
const findForoMongo = new FindForoMongo();
const foroService = new FindForoService(findForoMongo)


export const findForoControllers = async (req: Request, res: Response) => {
    const result = foroService.findForos();
    res.json(result)
}

export const findForoById = async (req: Request, res: Response) => {
    const id = req.params
    const result = foroService.findForoById(id)
    if (!result) {
        res.json({ msg: 'the foro not exited' })
    }
    res.json(result)
}
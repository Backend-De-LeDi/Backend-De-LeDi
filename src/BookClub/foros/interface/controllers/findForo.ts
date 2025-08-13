import { Request, Response } from "express";
import { FindForoService } from "../../app/service/findForos.Service";
import { FindForoMongo } from "../../infraestructure/foros.repo.mongo";



//new intances
const findForoMongo = new FindForoMongo();
const foroService = new FindForoService(findForoMongo)

export const findForosLogic = async () => {
    return await foroService.findForos();
};
export const findForoControllers = async (req: Request, res: Response) => {
    try {

        const result = await foroService.findForos();
        console.log(result)
        res.status(200).json(result);

    } catch (error) {
        console.log("error en foros", error)

        res.status(500).json({ msg: 'the internal server error' })



    }
}

export const findForoById = async (reqId: Request | string, res?: Response) => {
    let id: string

    try {
        if (typeof reqId !== "string") {
            id = reqId.params.id
        } else {
            id = reqId
        }
        const result = foroService.findForoById(id)

        if (!result) {
            if (res) {
                res.status(404).json({ msg: "The foro not exists" });
            }
            null;
        }

        if (res) {
            res.json(result)
        }

        return result

    } catch (error) {
        console.log(error)
        if (res) {
            res.status(500).json({ msg: 'the internal server error' })

        }
    }


}
import { Request, Response } from "express";
import { sendEmail } from "../../application/service/SendEmail.Service";
import { FindTokenMongo } from "../../../Token/MongoRepository/TokenMongo";


const findTokenMongo = new FindTokenMongo()


export const sendEmailController = async (req: Request, res: Response) => {

    const { email } = req.body;

    // Esperar a que sendEmail termine
    const emailSent = await sendEmail(email);


    // Responder correctamente
    res.status(200).json({ msg: "Email sent successfully" });

};
export const validationToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        console.log(token)
        const result = await findTokenMongo.findToken(token);
        if (!result) {
            // Usar 401 para token incorrecto o no autorizado
            res.status(401).json({ msg: 'token incorrecto' });
        }

        // Si el token es válido, entonces enviamos una respuesta positiva.
        res.status(200).json({ msg: 'token válido' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'the internal server error' });
    }
};
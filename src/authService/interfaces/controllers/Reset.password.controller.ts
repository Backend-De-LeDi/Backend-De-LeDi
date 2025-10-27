import { Request, Response } from "express";
import { sendEmail, validateTokenService } from "../../application/service/SendEmail.Service";
import { FindTokenMongo } from "../../../Token/MongoRepository/TokenMongo";
import { AuthMongoRepostitory, UpdateUSerMongo } from "../../../userService/infrastructure/userRespositoryMongo";


const findTokenMongo = new FindTokenMongo()


export const sendEmailController = async (req: Request, res: Response) => {

    const { email } = req.body;

    const emailSent = await sendEmail(email);


    res.status(200).json({ msg: "Email sent successfully" });

};
export const validateTokenController = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;

        const response = await validateTokenService(token, password);

        return res.status(response.status).json({ msg: response.msg });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "internal server error" });
    }
};
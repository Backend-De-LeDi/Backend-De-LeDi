// import sgMail, { MailDataRequired } from "sendgrid/mail"
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { CreateToken, FindTokenMongo } from "../../../Token/MongoRepository/TokenMongo";
import { AuthMongoRepostitory, UpdateUSerMongo } from "../../../userService/infrastructure/userRespositoryMongo";


sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const findEmail = new AuthMongoRepostitory()
const findTokenMongo = new FindTokenMongo();
const updateUser = new UpdateUSerMongo();

export const sendEmail = async (email: string) => {
    const user = findEmail.findByEmail(email)
    if (!user) {
        throw new Error
    }
    const newToken = new CreateToken()
    const token = await newToken.createAdminToken(email)
    const msg: MailDataRequired = {
        to: email,
        from: "formosenastintas@gmail.com",
        subject: "Not-reply",
        text: "Not-reply",
        html: `<h1>El token se eliminara luego de un minuto </h1>
            <strong>${token.token}</strong>`,
    };
    await sgMail.send(msg);
    console.log("Email sent");
}




export const validateTokenService = async (token: string, password: string) => {
    const result = await findTokenMongo.findToken(token);
    if (!result) {
        return { status: 401, msg: "token incorrecto" };
    }

    if (result.userEmail) {
        const user = await findEmail.findByEmail(result.userEmail);

        if (!user) {
            return { status: 404, msg: "usuario no encontrado" };
        }

        const updated = await updateUser.updateUSer(user._id, { password });

        if (!updated) {
            return { status: 304, msg: "la contraseña no fue actualizada" };
        }
    }


    return { status: 200, msg: "token válido y contraseña actualizada" };
};

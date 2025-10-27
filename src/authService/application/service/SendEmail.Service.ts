import sgMail, { MailDataRequired } from "@sendgrid/mail"
import { CreateToken } from "../../../Token/MongoRepository/TokenMongo";
import { AuthMongoRepostitory } from "../../../userService/infrastructure/userRespositoryMongo";


sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const findEmail = new AuthMongoRepostitory()
export const sendEmail = async (email: string) => {
    const user = findEmail.findByEmail(email)
    if (!user) {
        throw new Error
    }
    const newToken = new CreateToken()
    const token = await newToken.createAdminToken()
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
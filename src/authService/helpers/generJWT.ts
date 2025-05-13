import jwt from "jsonwebtoken";
import ENV from "../config/env";
import { AuthUser } from "../types/auth-types";

const JWT_SECRET = "clave_secreta";
export const generarJWT = (id: any) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        console.log(payload)
        jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                console.error("Error generating JWT:", err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}
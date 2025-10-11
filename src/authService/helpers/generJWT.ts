import jwt from "jsonwebtoken";
import ENV from "../../shared/config/configEnv";

const JWT_SECRET = "clave_secreta";
export const generarJWT = (id: any, rol: string) => {
  return new Promise((resolve, reject) => {
    const payload = { id, rol };
    console.log(payload);
    jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        console.error("Error generating JWT:", err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

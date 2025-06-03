import jwt from "jsonwebtoken";
import ENV from "../../config/configEnv";

const JWT_SECRET = ENV.JWT_SECRET;
export const generarJWT = (id: any, rol: string) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    console.log(payload);
    jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error("Error generating JWT:", err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

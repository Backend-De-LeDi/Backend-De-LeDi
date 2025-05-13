import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  mongoURL: process.env.URL_MONGO,
  clave_jwt: process.env.CLAVE_SECRETA
};
export default ENV;

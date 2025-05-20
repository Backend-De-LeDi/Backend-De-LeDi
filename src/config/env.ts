import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  mongoURL: process.env.URL_DB
};
export default ENV;

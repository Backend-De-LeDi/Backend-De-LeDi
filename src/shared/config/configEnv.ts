import * as dotenv from "dotenv";
dotenv.config();

const ENV: Env = {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URL: String(process.env.URL_DB),
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
};

interface Env {
  PORT: number;
  MONGO_URL: string;
  CLOUD_NAME: string | undefined;
  API_KEY: string | undefined;
  API_SECRET: string | undefined;
}

export default ENV;

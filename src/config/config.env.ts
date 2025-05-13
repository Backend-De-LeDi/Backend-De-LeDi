import * as dotenv from "dotenv";
dotenv.config();

const ENV: Env = {
  PORT: Number(process.env.PORT) || 3000,
};
interface Env {
  PORT: number;
}

export default ENV;

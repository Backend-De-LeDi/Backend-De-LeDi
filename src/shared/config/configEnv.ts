import * as dotenv from "dotenv";
dotenv.config();

interface Env {
  PORT: number;
  MONGO_URL: string;
  CLOUD_NAME: string | undefined;
  API_KEY: string | undefined;
  API_SECRET: string | undefined;
  GEMINI_API_KEY: string | undefined;
  URL_GEMINI: string | undefined;
  URL_SUPABASE: string | undefined;
  SUPABASE_KEY: string | undefined;
}

const ENV: Env = {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URL: String(process.env.URL_DB),
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  URL_GEMINI: process.env.URL_GEMINI,
  URL_SUPABASE: process.env.URL_SUPABASE,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
};

export default ENV;

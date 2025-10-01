import OpenAI from "openai"
import ENV from "../../../shared/config/configEnv"

export const openai = new OpenAI({
     apiKey: ENV.GEMINI_API_KEY,
     baseURL: ENV.URL_GEMINI
})


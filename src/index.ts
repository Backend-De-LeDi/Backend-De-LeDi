import express from "express";
import cors from "cors";
import morgan from "morgan";
import ENV from "./config/config.env";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.listen(ENV.PORT, () => {
  console.log("server is run on http://localhost:3000");
});

import express from "express";
import cors from "cors";
import morgan from "morgan";
import ENV from "./books/shader/config/config.env";
import connections from "./books/infrastructure/db/database";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import route from "./books/infrastructure/expressBooksRouter";

const app = express();
const fileUpload = path.join(__dirname, "./uploads");
if (!fs.existsSync(fileUpload)) {
  fs.mkdirSync(fileUpload, { recursive: true });
}
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("./src/uploads"));
app.use(route);

app.listen(ENV.PORT, async () => {
  console.log();
  console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
  console.log();
  await connections();
});

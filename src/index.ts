import express from "express";
import cors from "cors";
import morgan from "morgan";
import ENV from "./config/configEnv";
import connections from "./config/db/database";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import bookRouter from "./books/interfaces/router/booksRoute";
import { userRoutes } from "./userService/interfaces/routes/userService.routes";
import { authRoutes } from "./authService/interfaces/routes/auth.routes";
import session from "express-session";
import audiobookRouter from "./audiobooks/interface/routers/audiobooksRouter";

const app = express();

const fileUpload = path.join(__dirname, "./uploads");

if (!fs.existsSync(fileUpload)) {
  fs.mkdirSync(fileUpload, { recursive: true });
}

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/uploads"));
app.use(
  session({
    secret: "tu_clave_secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // poner true solo si usas HTTPS
      maxAge: 3600000,
    },
  })
);

app.use(bookRouter);
app.use(audiobookRouter);
app.use(userRoutes);
app.use(authRoutes);

app.listen(ENV.PORT, async () => {
  console.log();
  console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
  console.log();
  await connections();
});

import express from "express";
import cors from "cors";
import morgan from "morgan";
<<<<<<< HEAD
import connectDB from './config/db/db'
import * as dotenv from "dotenv";
dotenv.config();
import ENV from "./config/env";

import { userRoutes } from "./userService/interfaces/routes/userService.routes"
import { authRoutes } from "./authService/interfaces/routes/auth.routes"
import session from "express-session";
import { bookRouter } from "./userPogressBooks/interface/routes/bookProgress.routes";

const app = express();
connectDB()
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // poner true solo si usas HTTPS
    maxAge: 3600000,
  }
}));

app.use(userRoutes)
app.use(authRoutes)
app.use(bookRouter)


app.listen(Number(ENV.PORT), () => {
  console.log(` Servidor corriendo en el puerto ${ENV.PORT}`);
});
=======
import ENV from "./config/configEnv";
import connections from "./config/db/database";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import route from "./books/interfaces/router/booksRoute";
import { userRoutes } from "./userService/interfaces/routes/userService.routes";
import { authRoutes } from "./authService/interfaces/routes/auth.routes";
import session from "express-session";

const app = express();

const fileUpload = path.join(__dirname, "./uploads");

if (!fs.existsSync(fileUpload)) {
  fs.mkdirSync(fileUpload, { recursive: true });
}

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
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

app.use(route);
app.use(userRoutes);
app.use(authRoutes);

app.listen(ENV.PORT, async () => {
  console.log();
  console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
  console.log();
  await connections();
});
>>>>>>> b68249ef17e3623004ef66761d5ae2112a52c967

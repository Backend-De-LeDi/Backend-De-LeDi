import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import connections from './shared/config/db/database'
import * as dotenv from "dotenv";
dotenv.config();
import ENV from "./shared/config/configEnv";

import { userRoutes } from "./userService/interfaces/routes/userService.routes"
import route from "./books/interfaces/router/booksRoute";
import { authRoutes } from "./authService/interfaces/routes/auth.routes"
import session from "express-session";
import { progressRouter } from "./userPogressBooks/interface/routes/bookProgress.routes";
import { autorRoutes } from "./authorService/interfaces/routes/authores.routes";
import { avaRoutes } from "./avatars/interface/routes/avatar.routes";

const app = express();
connections()

const fileUpload = path.join(__dirname, "./uploads");

if (!fs.existsSync(fileUpload)) {
  fs.mkdirSync(fileUpload, { recursive: true });
}
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://localhost:3000",
      "http://localhost:5173",
    ],

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("./src/uploads"));

app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 3600000,
  }
}));

app.use(userRoutes)
app.use(authRoutes)
app.use(autorRoutes)
app.use(progressRouter)
app.use(route);
app.use(avaRoutes)


app.listen(Number(ENV.PORT), () => {
  console.log(` Servidor corriendo en el puerto ${ENV.PORT}`);
});
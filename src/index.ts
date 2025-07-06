// ? importación de módulos necesarios
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import cookies from "cookie-parser";

// ? importación de módulos locales
import ENV from "./shared/config/configEnv";
import connections from "./shared/config/db/database";
import { userRoutes } from "./userService/interfaces/routes/userService.routes";
import { autorRoutes } from "./authorService/interfaces/routes/authors.routes";
import bookRouter from "./books/interfaces/router/booksRoute";
import { authRoutes } from "./authService/interfaces/routes/auth.routes";
import session from "express-session";
import audiobookRouter from "./audiobooks/interface/routers/audiobooksRouter";
import { progressRouter } from "./userPogressBooks/interface/routes/bookProgress.routes";

// ? creación de la aplicación Express
const app = express();

// ? configuración del directorio de subida de archivos
const fileUpload = path.join(__dirname, "./uploads");

// ? verificación de la existencia del directorio de subida de archivos
if (!fs.existsSync(fileUpload)) fs.mkdirSync(fileUpload, { recursive: true });

// ? configuración de middlewares
app.use(
  cors({
    origin: ["http://localhost:5500", "http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookies());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/uploads"));

// ? configuración de sesiones
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

// ? configuración de rutas
app.use(userRoutes);
app.use(authRoutes);
app.use(autorRoutes);
app.use(progressRouter);
app.use(bookRouter);
app.use(audiobookRouter);

// ? configuración de puerto
app.listen(Number(ENV.PORT), async () => {
  console.log();
  console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
  console.log();
  await connections();
});

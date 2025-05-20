import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from './config/db/db'
import * as dotenv from "dotenv";
dotenv.config();
import ENV from "./config/env";
// import separatorConsole from "./utils/consoleSeparator";


import { userRoutes } from "./userService/interfaces/routes/userService.routes"
import { authRoutes } from "./authService/interfaces/routes/auth.routes"
import session from "express-session";

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


app.listen(Number(ENV.PORT), () => {
  console.log(` Servidor corriendo en el puerto ${ENV.PORT}`);
});

import { v2 as cloudinary } from "cloudinary";
import ENV from "../config/config.env";
import chalk from "chalk";

cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.API_KEY,
  api_secret: ENV.API_SECRET,
});

export async function subirImagen(rutaArchivo: string) {
  try {
    const result = await cloudinary.uploader.upload(rutaArchivo, { folder: "book_covers" });

    console.log("Imagen subida exitosamente:", result.secure_url);

    return result;
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en la utilidad: subirImagen"));
    console.log();
    console.log(error);
    console.log();
  }
}

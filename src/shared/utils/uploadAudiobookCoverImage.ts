import { v2 as cloudinary } from "cloudinary";
import ENV from "../config/configEnv";
import chalk from "chalk";

cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.API_KEY,
  api_secret: ENV.API_SECRET,
});

export async function uploadAudiobookCoverImagen(filePhat: string) {
  try {
    const result = await cloudinary.uploader.upload(filePhat, { folder: "AudiobooksCovers", resource_type: "image" });

    console.log("Imagen subida exitosamente:", result.secure_url);

    return result;
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en la utilidad: uploadAudiobookCoverImagen"));
    console.log();
    console.log(error);
    console.log();
  }
}

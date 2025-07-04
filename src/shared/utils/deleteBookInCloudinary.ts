import { v2 as cloudinary } from "cloudinary";
import ENV from "../config/configEnv";
import chalk from "chalk";

cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.API_KEY,
  api_secret: ENV.API_SECRET,
});

export async function deleteBookInCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    return result.result === "ok";
  } catch (error) {
    console.log();
    console.error(chalk.red("Error en la utilidad: deleteBookInCloudinary"));
    console.log();
    console.log(error);
    console.log();
    return false;
  }
}

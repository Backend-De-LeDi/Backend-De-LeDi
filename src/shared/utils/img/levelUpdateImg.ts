import { v2 as cloudinary } from "cloudinary";
import ENV from "../../config/configEnv";

cloudinary.config({
    cloud_name: ENV.CLOUD_NAME,
    api_key: ENV.API_KEY,
    api_secret: ENV.API_SECRET,
});

export async function subirImagenLevel(rutaArchivo: string) {
    try {
        const result = await cloudinary.uploader.upload(rutaArchivo, { folder: "level_img" });
        return result;
    } catch (error) {
        console.log(error)
    }
}

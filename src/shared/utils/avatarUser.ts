import { v2 as cloudinary } from "cloudinary";
import ENV from "../config/configEnv";

cloudinary.config({
    cloud_name: ENV.CLOUD_NAME,
    api_key: ENV.API_KEY,
    api_secret: ENV.API_SECRET,
});

export async function subirImagen(rutaArchivo: string) {
    try {
        const result = await cloudinary.uploader.upload(rutaArchivo, { folder: "User_avatar" });
        return result;
    } catch (error) {
        console.log(error)
    }
}

export async function subirAuthorimg(rutaArchivo: string) {
    try {
        const result = await cloudinary.uploader.upload(rutaArchivo, { folder: "Author_fotos" });
        return result;
    } catch (error) {
        console.log(error)
    }
}
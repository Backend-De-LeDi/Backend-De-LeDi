import { fileDelete } from "../utils/deleteFile";
import { subirImagen } from "../utils/author.photo";

export class UploadService {
    async uploadImage(file: Express.Multer.File) {
        if (!file) throw new Error("No se recibió ningún archivo");

        const result = await subirImagen(file.path);
        if (!result) throw new Error("Error al subir la imagen");

        const imageData = result.secure_url

        const deleted = await fileDelete(file.path);
        if (!deleted) {
            throw new Error(`No se pudo eliminar la imagen temporal en ${file.path}`);
        }

        return imageData;
    }
}

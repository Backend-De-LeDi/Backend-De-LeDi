import { fileDelete } from "../utils/deleteFile";
import { photoProfile } from "../types/photo.Types";
import { subirImgTrophy } from "../utils/trophyUpload";

export class UploadService {
    static async uploadAvatar(file: Express.Multer.File): Promise<photoProfile> {
        if (!file) throw new Error("No se recibió ningún archivo");

        const result = await subirImgTrophy(file.path);
        if (!result || !result.secure_url || !result.public_id) {
            throw new Error("Error al subir la imagen");
        }

        const deleted = await fileDelete(file.path);
        if (!deleted) {
            throw new Error(`No se pudo eliminar la imagen temporal en ${file.path}`);
        }

        return new photoProfile(result.public_id, result.secure_url);
    }
}


import { fileDelete } from "../utils/deleteFile";
import { uploadCoverImage } from "../utils/uploadCoverImage";

export class UploadService {
  async uploadImage(file: Express.Multer.File) {
    if (!file) throw new Error("No se recibió ningún archivo");

    const result = await uploadCoverImage(file.path);
    if (!result) throw new Error("Error al subir la imagen");

    const imageData = result.secure_url;

    const deleted = await fileDelete(file.path);
    if (!deleted) {
      throw new Error(`No se pudo eliminar la imagen temporal en ${file.path}`);
    }

    return imageData;
  }
}

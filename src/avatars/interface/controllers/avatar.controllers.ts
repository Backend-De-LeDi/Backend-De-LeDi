
import { Request, Response } from "express";
import { UploadService } from "../../../shared/services/uploadAvatar.service";
import { AvatarsService } from "../../app/services/avatars.service";
import { AvatarType } from "../../domain/entities/AvatarsTypes";
import { IAvatar } from "../../domain/ports/AvatarPorts";
import { AvatarMongoRepository } from "../../infrastructure/avatar.mongoRepository";
import mongoose from "mongoose";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";



const iAvatar: IAvatar = new AvatarMongoRepository()
const avatarControllers = new AvatarsService(iAvatar)

// Extend Request type to include file property
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}
export const saveAvatar = async (req: MulterRequest, res: Response) => {
    try {
        const gender = req.body.gender;
        const file = req.file;

        const avatarUploaded = await UploadService.uploadAvatar(file as Express.Multer.File);

        const date: AvatarType = {
            gender,
            avatars: {
                url_secura: avatarUploaded.url_secura,
                id_image: avatarUploaded.id_image
            }
        };

        const result = await avatarControllers.saveAvatar(date);

        if (!result) {
            res.status(304).json({ msg: 'The avatar was not saved' });
        }

        res.status(201).json({ msg: 'The avatar was saved successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};



export const deleteAvatar = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const idValid = new mongoose.Types.ObjectId(id);

        const isDeletingCoverImage: boolean = await deleteCoverImage(id);
        if (!isDeletingCoverImage) {
            res.status(500).json({
                msg: "Ocurrió un error al eliminar la imagen en Cloudinary. Verifica si sigue existiendo."
            });
        }

        const repo = new AvatarMongoRepository();
        await repo.deleteAvatar(idValid);

        res.status(200).json({ msg: 'Avatar eliminado exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const getAvatars = async (req: Request, res: Response) => {
    try {
        const avatars = await avatarControllers.findAvatars();
        res.status(200).json(avatars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno al obtener los avatares' });
    }
};

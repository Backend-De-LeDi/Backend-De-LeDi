
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
        const gender = req.body;
        const file = req.file;

        const avatars = await UploadService.uploadAvatar(file as Express.Multer.File)

        const date: AvatarType = { gender, avatars }
        const result = await avatarControllers.saveAvatar(date)
        if (!result) {
            res.status(304).json({ msg: 'the avatar not save' })
        }
        res.status(201).json({ msg: 'the avatar successfull' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'the internal server error ' })
    }
}


export const deleteAvatar = async (req: Request, res: Response) => {
    const id = req.params.id;
    const idValid = new mongoose.Types.ObjectId(id);
    // const isDeletingCoverImage: boolean = await deleteCoverImage();
    //   if (!isDeletingCoverImage)
    //     return res.status(500).json({ msg: "Ocurrió un error al eliminar la imagen en Cloudinary. Verifica si sigue existiendo." });
}
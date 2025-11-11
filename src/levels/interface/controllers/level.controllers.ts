import { Request, Response } from "express";
import mongoose from "mongoose";
import { deleteCoverImage } from "../../../shared/utils/deleteCoverImage";
import { LevelsTypes } from "../../domain/entities/LevesTypes";
import { LevelMongoRepository } from "../../infrastructure/Level.mongoRepository";
import { ILevelsRepo } from "../../domain/ports/levelPorts";
import { LevelService } from "../../app/services/Level.service";
import { UploadServiceLevel } from "../../../shared/services/uploadLevel.Service";

const levelMongo: ILevelsRepo = new LevelMongoRepository();
const levelControllers = new LevelService(levelMongo);

// Extend Request type to include file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
export const saveLevel = async (req: MulterRequest, res: Response) => {
  try {
    const { level, level_string, maxPoint } = req.body;
    const file = req.file;

    const levelUploaded = await UploadServiceLevel.uploadLevel(file as Express.Multer.File);

    const date: LevelsTypes = {
      level,
      img: {
        url_secura: levelUploaded.url_secura,
        id_image: levelUploaded.id_image,
      },
      level_string,
      maxPoint
    };

    const result = await levelControllers.saveLevel(date);
    if (!result) {
      res.status(304).json({ msg: "The avatar was not saved" });
    }

    res.status(201).json({ msg: "The avatar was saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteLevel = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const idValid = new mongoose.Types.ObjectId(id);

    const level = await levelControllers.findLevelByID(id)
    if (!level) {
      res.status(404).json('level not found')
    } else {
      const isDeletingCoverImage: boolean = await deleteCoverImage(level?.img.id_image)
      if (!isDeletingCoverImage) {
        res.status(500).json({
          msg: "Ocurrió un error al eliminar la imagen en Cloudinary. Verifica si sigue existiendo.",
        });
      } else {
        await levelControllers.deleteLevel(idValid);
        res.status(200).json({ msg: "Avatar eliminado exitosamente" });

      }
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getLeves = async (req: Request, res: Response) => {
  try {
    const leve = req.body
    const level = await levelControllers.findLevel(leve);
    res.status(200).json(level);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno al obtener los avatares" });
  }
};
export const getFirtsLevel = async (req: Request, res: Response) => {
  try {
    const firtsLevel = await levelControllers.findFirtsLevel(1)
    res.status(200).json(firtsLevel)
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno al obtener los avatares" });
  }
}
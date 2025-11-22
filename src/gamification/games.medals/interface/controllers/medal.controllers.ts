import { Request, Response } from "express";
import mongoose from "mongoose";

import { deleteCoverImage } from "../../../../shared/utils/deleteCoverImage";
import { IMedalsRepo } from "../../domain/ports/medalsPorts";
import { MedalsMongoRepository } from "../../infrastructure/Medal.mongoRepository";
import { MedalService } from "../../app/services/Medals.service";
import { MedalsTypes } from "../../domain/entities/MedalsTypes";
import { UploadMedalsService } from "../../../../shared/services/upload_medals.Service";

const medalMongo: IMedalsRepo = new MedalsMongoRepository();
const medalControllers = new MedalService(medalMongo);

// Extend Request type to include file property
interface MulterRequest extends Request {
	file?: Express.Multer.File;
}
export const saveMedal = async (req: MulterRequest, res: Response) => {
	try {
		const { name, medals_posicion } = req.body;
		const file = req.file;

		const img = await UploadMedalsService.uploadAvatar(file as Express.Multer.File);

		const date: MedalsTypes = {
			name,
			medals_posicion,
			img
		};

		const result = await medalControllers.saveMedals(date);
		if (!result) {
			res.status(304).json({ msg: "The medals was not saved" });
		}

		res.status(201).json({ msg: "The medals was saved successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Internal server error" });
	}
};

export const deleteMedals = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const idValid = new mongoose.Types.ObjectId(id);

		const medal = await medalControllers.findMedalsByID(idValid)
		if (!medal) {
			res.status(404).json('medal not found')
		} else {
			const isDeletingCoverImage: boolean = await deleteCoverImage(medal?.img.id_image)
			if (!isDeletingCoverImage) {
				res.status(500).json({
					msg: "Ocurrió un error al eliminar la imagen en Cloudinary. Verifica si sigue existiendo.",
				});
			} else {
				await medalControllers.deleteMedals(idValid);
				res.status(200).json({ msg: "Avatar eliminado exitosamente" });

			}
		}


	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

export const findByIdMedal = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const idValid = new mongoose.Types.ObjectId(id);
		const medal = await medalControllers.findMedalsByID(idValid)
		if (!medal) {
			res.status(404).json('medal not found')
		}
		res.status(200).json({ msg: 'the medals', medal })

	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
}
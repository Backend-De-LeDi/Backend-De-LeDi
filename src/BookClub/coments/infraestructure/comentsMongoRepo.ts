import { ComentTypes } from "../domain/entities/coments.types";
import { ICreateComent } from "../domain/ports/createComent.port";
import { IDeleteComent } from "../domain/ports/deleteComentPorts";
import { IfindComents } from "../domain/ports/findComentsPorts";
import { IUpdateComentPort } from "../domain/ports/updateComents.ports";
import comentsModel from "./models/comentsModel";


export class CreateComentMongo implements ICreateComent {
    async createComent(coment: ComentTypes): Promise<ComentTypes> {
        const result = new comentsModel(coment);
        return result.save()
    }
}
export class FindComentsMongo implements IfindComents {
    async findComents(): Promise<ComentTypes[]> {
        // Corregir: idUser, no idUSer
        return await comentsModel.find().populate("idUser", "userName email");
    }
    async findComentById(id: any): Promise<ComentTypes | null> {
        return await comentsModel.findById(id)
            .populate("idUser", "userName email") // Corregir: idUser, no users
            .exec();
    }
    async findComentByForo(foroId: any): Promise<ComentTypes[]> {
        // Corregir: quitar el .find() duplicado
        return await comentsModel.find({ idForo: foroId }).populate("idUser");
    }
}

export class DeleteComentsMongo implements IDeleteComent {
    async deleteComent(id: any, userid: any): Promise<void> {
        await comentsModel.findOneAndDelete({
            _id: id,
            idUser: userid
        });
    }
}
export class UpdateComents implements IUpdateComentPort {
    async updateComents(userID: any, idComent: any, coment: Partial<ComentTypes>): Promise<ComentTypes | null> {
        const updateComent = await comentsModel.findByIdAndUpdate(
            {
                $set: {
                    idUser: userID,
                    _id: idComent
                }
            },
            { new: true }
        );
        if (updateComent) {
            return updateComent
        } else {
            return null
        }
    }
}

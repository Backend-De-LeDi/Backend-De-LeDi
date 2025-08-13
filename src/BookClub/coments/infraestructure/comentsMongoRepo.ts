import { ComentTypes } from "../domain/entities/coments.types";
import { ICreateComent } from "../domain/ports/createComent.port";
import { IDeleteComent } from "../domain/ports/deleteComentPorts";
import { IfindComents } from "../domain/ports/findComentsPorts";
import comentsModel from "./models/comentsModel";


export class CreateComentMongo implements ICreateComent {
    async createComent(coment: ComentTypes): Promise<ComentTypes> {
        const result = new comentsModel(coment);
        return result.save()
    }
}
export class FindComentsMongo implements IfindComents {
    async findComents(): Promise<ComentTypes[]> {
        return await comentsModel.find()
    }
    async findComentById(id: any): Promise<ComentTypes | null> {
        return await comentsModel.findById(id)
    }
}

export class DeleteComentsMongo implements IDeleteComent {
    async deleteComent(id: any): Promise<void> {
        await comentsModel.findByIdAndDelete(id)
    }
}
import { ComentTypes } from "../../domain/entities/coments.types";
import { ICreateComent } from "../../domain/ports/createComent.port";


export class CreateComentService implements ICreateComent {
    constructor(
        private readonly comentRepo: ICreateComent
    ) { }
    async createComent(coment: ComentTypes): Promise<ComentTypes> {
        return await this.comentRepo.createComent(coment)
    }
}
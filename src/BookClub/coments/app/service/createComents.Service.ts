import { api_response } from "../../../../shared/types/reponse.types";
import { ComentTypes } from "../../domain/entities/coments.types";
import { ICreateComent } from "../../domain/ports/createComent.port";


export class CreateComentService implements ICreateComent {
    constructor(
        private readonly comentRepo: ICreateComent
    ) { }
    async createComent(coment: ComentTypes): Promise<ComentTypes | api_response> {
        if (!coment.idForo) {
            return {
                success: false,
                message: "The idForo is required",
                status: 400
            };
        }
        return await this.comentRepo.createComent(coment)
    }
}
export class AdminCreateComentService implements ICreateComent {
    constructor(
        private readonly comentRepo: ICreateComent
    ) { }
    async createComent(coment: ComentTypes): Promise<ComentTypes | api_response> {
        coment.Admin = true
        return await this.comentRepo.createComent(coment)
    }
}
import { ComentTypes } from "../../domain/entities/coments.types";
import { IfindComents } from "../../domain/ports/findComentsPorts";
import { FindComentsMongo } from "../../infraestructure/comentsMongoRepo";



export class FindComentService implements IfindComents {
    constructor(
        private readonly findComentsRepo: FindComentsMongo
    ) { }
    async findComents(): Promise<ComentTypes[]> {
        return await this.findComentsRepo.findComents()
    }
    async findComentById(id: any): Promise<ComentTypes | null> {
        return await this.findComentsRepo.findComentById(id)
    }
    async findComentByForo(foroId: string): Promise<ComentTypes[]> {
        return await this.findComentsRepo.findComentByForo(foroId)
    }
}


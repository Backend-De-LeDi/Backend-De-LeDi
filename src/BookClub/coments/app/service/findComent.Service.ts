import { ComentTypes } from "../../domain/entities/coments.types";
import { IfindComents } from "../../domain/ports/findComentsPorts";



export class FindComentService implements IfindComents {
    constructor(
        private readonly findComentsRepo: IfindComents
    ) { }
    async findComents(): Promise<ComentTypes[]> {
        return await this.findComentsRepo.findComents()
    }
    async findComentById(id: any): Promise<ComentTypes | null> {
        return await this.findComentsRepo.findComentById(id)
    }
}


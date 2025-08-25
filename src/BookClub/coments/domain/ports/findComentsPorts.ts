import { ComentTypes } from "../entities/coments.types";

export interface IfindComents {
    findComents(): Promise<ComentTypes[]>
    findComentById(id: any): Promise<ComentTypes | null>
}
import { ComentTypes } from "../entities/coments.types";

export interface IfindComents {
    findComents(): Promise<ComentTypes[]>
    findComentById(id: any): Promise<ComentTypes | null>
    findComentByForo(foroId: string): Promise<ComentTypes[]>
    findComentByUserID(userID: string): Promise<ComentTypes[]>
    findAdminComent(): Promise<ComentTypes[] | null>
}
import { ComentTypes } from "../entities/coments.types";


export interface IUpdateComentPort {
    updateComents(userID: any, idComent: any, coment: Partial<ComentTypes>): Promise<ComentTypes | null>
}
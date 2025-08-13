import { ComentTypes } from "../entities/coments.types";

export interface ICreateComent {
    createComent(coment: ComentTypes): Promise<ComentTypes>
}

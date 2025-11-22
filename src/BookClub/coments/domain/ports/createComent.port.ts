import { api_response } from "../../../../shared/types/reponse.types";
import { ComentTypes } from "../entities/coments.types";

export interface ICreateComent {
    createComent(coment: ComentTypes): Promise<ComentTypes | api_response>
}

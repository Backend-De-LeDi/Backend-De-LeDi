import { ComentTypes } from "../entities/coments.types";



export interface CreateAnswersRepo {
    createAnswer(idComent: any, content: ComentTypes): Promise<ComentTypes>
}
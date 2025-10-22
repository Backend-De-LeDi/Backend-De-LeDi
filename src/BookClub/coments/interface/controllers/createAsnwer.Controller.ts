import { CreateAnswerService } from "../../app/service/createAnswer.Service";
import { ComentTypes } from "../../domain/entities/coments.types";
import { CreateAnswer } from "../../infraestructure/comentsMongoRepo";




const createAnswerMongo = new CreateAnswer()
const createAnswerService = new CreateAnswerService(createAnswerMongo)


export const createAnsweController = async (idComent: any, coment: ComentTypes) => {
    return await createAnswerService.createAnswer(idComent, coment)
}
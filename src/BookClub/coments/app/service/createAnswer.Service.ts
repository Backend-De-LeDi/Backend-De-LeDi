import { ComentTypes } from "../../domain/entities/coments.types";
import { CreateAnswersRepo } from "../../domain/ports/createAnswers.port";



export class CreateAnswerService implements CreateAnswersRepo {
    constructor(
        private readonly createAnswerRepo: CreateAnswersRepo
    ) { }
    async createAnswer(idComent: any, content: ComentTypes): Promise<ComentTypes> {
        return await this.createAnswerRepo.createAnswer(idComent, content)
    }
}
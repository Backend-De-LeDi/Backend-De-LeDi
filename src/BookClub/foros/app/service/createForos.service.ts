import { Foro } from "../../domain/entities/foros.types";
import { ICreateForo } from "../../domain/ports/createForoPort";

export class CreateForoService implements ICreateForo {
    constructor(
        private readonly createRepo: ICreateForo) {

    }

    async createForo(foro: Foro): Promise<Foro> {
        const result = await this.createRepo.createForo(foro)
        return result
    }
}
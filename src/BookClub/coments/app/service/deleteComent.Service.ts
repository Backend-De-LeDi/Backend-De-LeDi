import { IDeleteComent } from "../../domain/ports/deleteComentPorts";

export class DeleteComentService implements IDeleteComent {
    constructor(
        private readonly deleteComentRepo: IDeleteComent
    ) {

    }
    async deleteComent(id: any, userId: any): Promise<void> {
        await this.deleteComentRepo.deleteComent(id, userId)
    }
}
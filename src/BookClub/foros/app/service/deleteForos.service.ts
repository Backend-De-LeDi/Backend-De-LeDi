import { IDeleteForo } from "../../domain/ports/deleteForoPort";


//class of foro
export class DeleteForo implements IDeleteForo {
    constructor(private readonly deleteRepo: IDeleteForo) { }

    async deleteForo(id: any): Promise<void> {
        await this.deleteRepo.deleteForo(id)
    }
}
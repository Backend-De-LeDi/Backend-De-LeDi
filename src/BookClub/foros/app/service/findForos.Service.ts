import { Foro } from "../../domain/entities/foros.types";
import { IFindForos } from "../../domain/ports/findForoPort";


export class FindForoService implements IFindForos {
    //constructor implement the interface of the foro
    constructor(
        private readonly findRepo: IFindForos
    ) { }
    async findForoById(id: any): Promise<Foro | null> {
        const foro = await this.findRepo.findForoById(id)
        return foro
    }
    async findForos(): Promise<Foro[]> {
        const foros = await this.findRepo.findForos()
        return foros
    }
}

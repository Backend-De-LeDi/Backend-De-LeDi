import { Foro } from "../entities/foros.types";

//interfaces for  find and find by for id 
export interface IFindForos {
    findForos(): Promise<Foro[]>
    findForoById(id: any): Promise<Foro | null>
}
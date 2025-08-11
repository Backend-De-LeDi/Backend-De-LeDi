import { Foro } from "../entities/foros.types";

export interface ICreateForo {
    createForo(foro: Foro): Promise<Foro>
}
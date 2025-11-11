import { AvatarType } from "../../../avatars/domain/entities/AvatarsTypes";
import { LevelsTypes } from "../../../levels/domain/entities/LevesTypes";

import ENV from "../../../shared/config/configEnv";


export async function getLevel(): Promise<LevelsTypes[]> {
    try {
        const response = await fetch(`http://localhost:${ENV.PORT}/firtsLevel`);


        const data: LevelsTypes[] = await response.json();
        console.log(data)
        return data

    } catch (error) {
        console.error('Error al obtener los avatares:', error);
        throw new Error('No se pudieron obtener los avatares');
    }
}

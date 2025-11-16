import { AvatarType } from "../../../avatars/domain/entities/AvatarsTypes";
import { LevelsTypes } from "../../../levels/domain/entities/LevesTypes";

import ENV from "../../../shared/config/configEnv";


export async function getLevel(): Promise<{ id: any, url: string }> {
    try {
        const response = await fetch(`http://localhost:${ENV.PORT}/firtsLevel`);


        const data = await response.json();

        return {
            id: data.id,
            url: data.url
        }

    } catch (error) {
        console.error('Error al obtener los avatares:', error);
        throw new Error('No se pudieron obtener los avatares');
    }
}

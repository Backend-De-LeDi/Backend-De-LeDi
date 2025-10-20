import { AvatarType } from "../../../avatars/domain/entities/AvatarsTypes";
import { LevesTypes } from "../../../Leves/domain/entities/LevesTypes";
import ENV from "../../../shared/config/configEnv";


export async function getLevel(): Promise<LevesTypes[]> {
    try {
        const response = await fetch(`http://localhost:3402/firtsLevel`);


        const data: LevesTypes[] = await response.json();
        console.log(data)
        return data

    } catch (error) {
        console.error('Error al obtener los avatares:', error);
        throw new Error('No se pudieron obtener los avatares');
    }
}

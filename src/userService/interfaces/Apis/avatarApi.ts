import { AvatarType } from "../../../avatars/domain/entities/AvatarsTypes";
import ENV from "../../../shared/config/configEnv";
import { avatarsAssignment } from "../../domain/utils/avatarAssignment";

export async function getAllAvatars(): Promise<AvatarType[]> {
    try {
        const response = await fetch(`http://localhost:3402/getAvatars`);


        const data: AvatarType[] = await response.json();
        console.log(data)
        return data

    } catch (error) {
        console.error('Error al obtener los avatares:', error);
        throw new Error('No se pudieron obtener los avatares');
    }
}

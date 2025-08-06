import { AvatarType } from "../../../avatars/domain/entities/AvatarsTypes";

type AvatarSeleccionado = {
    _id: string;
};

export async function avatarsAssignment(avatars: AvatarType[]): Promise<AvatarSeleccionado | null> {
    if (avatars.length === 0) {
        return null;
    }

    const index = Math.floor(Math.random() * avatars.length);
    const avatar = avatars[index];
    const idAvatar = avatar._id

    return idAvatar
}

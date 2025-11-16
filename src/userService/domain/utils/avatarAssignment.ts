import { AvatarType } from "../../../avatars/domain/entities/AvatarsTypes";


export async function avatarsAssignment(avatars: AvatarType[]): Promise<string | null> {
    if (avatars.length === 0) {
        return null;
    }

    const index = Math.floor(Math.random() * avatars.length);
    const avatar = avatars[index];
    const userAvatar = avatar.avatars.url_secura


    return userAvatar
}

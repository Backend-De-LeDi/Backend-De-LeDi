import { photoProfile } from "../../../shared/types/photo.Types";

//dates of user
export class AvatarType {
  constructor(public readonly gender: string, public readonly avatars: photoProfile) {}
}

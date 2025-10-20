import { photoProfile } from "../../../shared/types/photo.Types";

//dates of user
export class LevesTypes {
  constructor(
    public readonly level: string,
    public readonly img: photoProfile,
    public _id?: any
  ) { }
}

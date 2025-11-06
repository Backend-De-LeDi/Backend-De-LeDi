import { photoProfile } from "../../../shared/types/photo.Types";

//dates of level
export class LevesTypes {
  constructor(
    public readonly level: number,
    public readonly level_string: string,
    public readonly img: photoProfile,
    public readonly maxPoint: number,
    public _id?: any
  ) { }
}

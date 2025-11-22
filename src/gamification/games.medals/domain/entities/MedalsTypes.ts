import { photoProfile } from "../../../../shared/types/photo.Types";

//dates of level
export class MedalsTypes {
  constructor(
    public readonly name: string,
    public readonly medals_posicion: number,
    public readonly img: photoProfile,
    public _id?: any
  ) { }
}

import { Types } from "mongoose";

export class Recommendations {
  constructor(public readonly idUser: Types.ObjectId, public readonly idsBooks: Types.ObjectId[]) {}
}

import { Types } from "mongoose"

export class VectorStoreMemory {
     public idUser: Types.ObjectId
     public idSeccion: string
     public conversation: { role: string, message: string }[] = []
     public readonly _id: Types.ObjectId

     constructor(idUser: Types.ObjectId, idSeccion: string, role: string, message: string, _id?: Types.ObjectId) {
          this.idUser = idUser
          this.idSeccion = idSeccion
          this.conversation.push({ role, message })
          this._id = _id ?? new Types.ObjectId()
     }
}
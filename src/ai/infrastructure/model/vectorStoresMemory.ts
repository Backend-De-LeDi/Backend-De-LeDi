import { model, Schema, Types } from "mongoose"

const vectorStoreMemory = new Schema({
     idUser: { type: Types.ObjectId, ref: "Users", required: true },
     idSeccion: { type: String, required: true },
     conversation: [{
          role: { type: String, required: true },
          message: { type: String, required: true }
     }]
}, { timestamps: true })

export const VectorStoreMemoryModel = model("VectorStoreMemory", vectorStoreMemory)
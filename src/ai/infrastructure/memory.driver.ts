import { Types } from "mongoose";
import { MemoryRepository } from "../domain";
import { SessionRecord } from "../domain";
import { SessionRecordModel } from "./model/sessionRecordModel";

export class MemoryDriver implements MemoryRepository {
  async getAllVectorStoresMemoryByIdUser(idUser: Types.ObjectId): Promise<SessionRecord[]> {
    return await SessionRecordModel.find({ "sessionId.idUser": idUser });
  }

  async getAllVectorStoreMemoryByIdSession(idSession: string): Promise<SessionRecord[]> {
    return await SessionRecordModel.find({ "sessionId.idSession": idSession });
  }
}

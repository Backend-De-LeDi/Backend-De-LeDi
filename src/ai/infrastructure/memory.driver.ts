import { Types } from "mongoose";
import { MemoryRepository } from "../domain";
import { SessionRecord } from "../domain";
import { SessionRecordModel } from "./model/sessionRecordModel";
import { Memory } from "../../shared/types/memoryTypes/memory";

export class MemoryDriver implements MemoryRepository {
  async getAllVectorStoresMemoryByIdUser(idUser: string): Promise<Memory[]> {
    const records = await SessionRecordModel.find({ "sessionId.idUser": idUser }).lean();

    const result = records.map((record) => ({
      idSession: record.sessionId.idSession,
      messages: record.messages
        .filter((m) => m.type === "human" || m.type === "ai")
        .map((m) => ({
          type: m.type,
          content: m.data.content,
        })),
    }));

    return result;
  }

  async getAllVectorStoreMemoryByIdSession(idSession: string, idUser: string): Promise<Memory[]> {
    const records = await SessionRecordModel.find({
      "sessionId.idSession": idSession,
      "sessionId.idUser": idUser,
    }).lean();

    const result = records.map((record) => ({
      idSession: record.sessionId.idSession,
      messages: record.messages
        .filter((m) => m.type === "human" || m.type === "ai")
        .map((m) => ({ type: m.type, content: m.data.content })),
    }));

    return result;
  }
}

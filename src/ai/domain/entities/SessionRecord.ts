import { Types } from "mongoose";
import { SessionId, Message } from "../../../shared/types/chatBotTypes/dataChatBotTypes";

export class SessionRecord {
  public readonly _id: Types.ObjectId;
  public sessionId: SessionId;
  public messages: Message[];

  constructor(params: { _id?: Types.ObjectId; sessionId: SessionId; messages: Message[] }) {
    this._id = params._id ?? new Types.ObjectId();
    this.sessionId = params.sessionId;
    this.messages = params.messages;
  }
}

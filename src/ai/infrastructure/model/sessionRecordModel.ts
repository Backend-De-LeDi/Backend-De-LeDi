import { Schema, model, Types } from "mongoose";
import { Message, MessageData, SessionId } from "../../../shared/types/chatBotTypes/dataChatBotTypes";
import { SessionRecord } from "../../domain";

const MessageDataSchema = new Schema<MessageData>(
  {
    content: { type: String, required: true },
    additional_kwargs: { type: Schema.Types.Mixed, default: {} },
    response_metadata: { type: Schema.Types.Mixed, default: {} },
    tool_calls: { type: [Schema.Types.Mixed], default: [] },
    invalid_tool_calls: { type: [Schema.Types.Mixed], default: [] },
  },
  { _id: false }
);

const MessageSchema = new Schema<Message>(
  {
    type: { type: String, enum: ["human", "ai"], required: true },
    data: { type: MessageDataSchema, required: true },
  },
  { _id: false }
);

const SessionIdSchema = new Schema<SessionId>(
  {
    idUser: { type: String, required: true },
    idSession: { type: String, required: true },
  },
  { _id: false }
);

const SessionRecordSchema = new Schema<SessionRecord>(
  {
    sessionId: { type: SessionIdSchema, required: true },
    messages: { type: [MessageSchema], default: [] },
  },
  { timestamps: true }
);

export const SessionRecordModel = model<SessionRecord>("vector_history", SessionRecordSchema);

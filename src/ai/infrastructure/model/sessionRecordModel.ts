import { Schema, model, Types } from "mongoose";
import { SessionId, Message } from "../../../shared/types/chatBotTypes/dataChatBotTypes";

const MessageDataSchema = new Schema({
     content: { type: String, required: true },
     additional_kwargs: { type: Schema.Types.Mixed, default: {} },
     response_metadata: { type: Schema.Types.Mixed, default: {} },
     tool_calls: { type: [Schema.Types.Mixed], default: [] },
     invalid_tool_calls: { type: [Schema.Types.Mixed], default: [] },
}, { _id: false });

const MessageSchema = new Schema({
     type: { type: String, enum: ["human", "ai"], required: true },
     data: { type: MessageDataSchema, required: true },
}, { _id: false });

const SessionIdSchema = new Schema({
     idUser: { type: String, required: true },
     idSecccion: { type: String, required: true },
}, { _id: false });

const SessionRecordSchema = new Schema({
     sessionId: { type: SessionIdSchema, required: true },
     messages: { type: [MessageSchema], default: [] },
}, { timestamps: true });

export const SessionRecordModel = model("SessionRecord", SessionRecordSchema);
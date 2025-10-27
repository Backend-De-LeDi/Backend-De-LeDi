export interface MessageData {
     content: string;
     additional_kwargs: Record<string, unknown>;
     response_metadata: Record<string, unknown>;
     tool_calls?: unknown[];
     invalid_tool_calls?: unknown[];
}

export interface Message {
     type: "human" | "ai";
     data: MessageData;
}

export interface SessionId {
     idUser: string;
     idSecccion: string;
}
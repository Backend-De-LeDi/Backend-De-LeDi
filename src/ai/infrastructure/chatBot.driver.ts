import { ChatBotRepository } from "../domain/repository/chatBotRepository";

export class ChatBotDriver implements ChatBotRepository {
  async createChat(msg: string, userId: string, session: string): Promise<{ output: string }[]> {
    console.log(JSON.stringify({ msg, userId, session }));

    const req = await fetch("http://localhost:5678/webhook/bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg, userId, session }),
    });

    if (!req.ok) {
      throw new Error(`Error HTTP ${req.status}`);
    }

    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Respuesta no es JSON");
    }

    const text = await req.text();
    if (!text.trim()) {
      throw new Error("Respuesta vacía");
    }

    const res: { output: string }[] = JSON.parse(text);
    return res;
  }
}

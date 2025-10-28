import { ChatBotDriver } from "../../infrastructure/chatBot.driver";
import { ChatApp } from "../../applications/chatBot.apps/chat";
import { Request, Response } from "express";

const chatDriver = new ChatBotDriver();
const chatApp = new ChatApp(chatDriver);

export class ChatControllers {
  async chat(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user.id;
      const { session, msg }: { session: string; msg: string } = req.body;

      const resChat: { output: string }[] = await chatApp.exec(msg, userId, session);

      return res.status(200).json(resChat);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error inesperado por favor intente de nuevo mas tarde" });
    }
  }
}

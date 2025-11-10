import { Request, Response } from "express";
import { MemoryApps } from "../../applications";
import { MemoryDriver } from "../../infrastructure/memory.driver";

const memoryDriver = new MemoryDriver();
const memoryApps = new MemoryApps(memoryDriver);

export class MemoryControllers {
  async getAllMemory(req: Request, res: Response): Promise<Response> {
    try {
      const idUser = req.user.id;

      const result = await memoryApps.getByUser(idUser);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error inesperado" });
    }
  }

  async getMemoryById(req: Request, res: Response): Promise<Response> {
    try {
      const idUser = req.user.id;
      const idSession = req.params.id;

      const result = await memoryApps.getBySession(idSession, idUser);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error inesperado" });
    }
  }
}
